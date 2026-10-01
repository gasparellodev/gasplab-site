begin;

create schema if not exists private;

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 2 and 120),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  invited_email text,
  display_name text,
  role text not null default 'member' check (role in ('admin', 'member')),
  status text not null default 'invited' check (status in ('invited', 'active', 'disabled')),
  invited_by uuid references auth.users(id) on delete set null default auth.uid(),
  invited_at timestamptz not null default now(),
  accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint members_org_id_unique unique (organization_id, id),
  constraint members_state_check check (
    (status = 'invited' and invited_email is not null)
    or (status = 'active' and user_id is not null)
    or status = 'disabled'
  ),
  constraint members_display_name_check check (
    display_name is null or char_length(btrim(display_name)) between 2 and 120
  )
);

create unique index members_org_user_unique
  on public.members (organization_id, user_id)
  where user_id is not null;
create unique index members_org_invited_email_unique
  on public.members (organization_id, lower(invited_email))
  where invited_email is not null and user_id is null and status = 'invited';
create index members_active_user_idx
  on public.members (user_id, organization_id)
  where status = 'active';

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  owner_member_id uuid,
  name text not null check (char_length(btrim(name)) between 2 and 180),
  segment text,
  website_url text,
  source text not null default 'manual'
    check (source in ('manual', 'google_places', 'referral', 'inbound', 'import')),
  source_reference text,
  provenance text not null default 'manual'
    check (provenance in ('manual', 'relationship', 'provided_by_business', 'import')),
  notes text,
  do_not_contact boolean not null default false,
  do_not_contact_reason text,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint leads_org_id_unique unique (organization_id, id),
  constraint leads_owner_fkey foreign key (organization_id, owner_member_id)
    references public.members(organization_id, id) on delete restrict,
  constraint leads_do_not_contact_reason_check check (
    not do_not_contact or nullif(btrim(do_not_contact_reason), '') is not null
  )
);

create unique index leads_google_place_unique
  on public.leads (organization_id, source_reference)
  where source = 'google_places' and source_reference is not null;
create index leads_org_owner_updated_idx
  on public.leads (organization_id, owner_member_id, updated_at desc);
create index leads_org_contactable_idx
  on public.leads (organization_id, updated_at desc)
  where do_not_contact = false;

create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  lead_id uuid not null,
  name text not null check (char_length(btrim(name)) between 2 and 180),
  job_title text,
  phone_e164 text check (phone_e164 is null or phone_e164 ~ '^[+][1-9][0-9]{7,14}$'),
  email text,
  is_primary boolean not null default false,
  provenance text not null default 'manual'
    check (provenance in ('manual', 'relationship', 'provided_by_business', 'import')),
  whatsapp_opt_in_at timestamptz,
  whatsapp_opt_in_source text,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint contacts_org_id_unique unique (organization_id, id),
  constraint contacts_lead_fkey foreign key (organization_id, lead_id)
    references public.leads(organization_id, id) on delete cascade,
  constraint contacts_opt_in_source_check check (
    whatsapp_opt_in_at is null or nullif(btrim(whatsapp_opt_in_source), '') is not null
  )
);

create unique index contacts_one_primary_per_lead
  on public.contacts (organization_id, lead_id)
  where is_primary = true;
create index contacts_org_lead_idx on public.contacts (organization_id, lead_id);
create index contacts_org_phone_idx
  on public.contacts (organization_id, phone_e164)
  where phone_e164 is not null;

create table public.opportunities (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  lead_id uuid not null,
  owner_member_id uuid,
  title text not null check (char_length(btrim(title)) between 2 and 180),
  stage text not null default 'new' check (
    stage in (
      'new', 'contacting', 'interested', 'preview_in_production',
      'preview_sent', 'proposal', 'won', 'lost'
    )
  ),
  next_action text,
  next_action_at timestamptz,
  proposal_value numeric(14, 2) check (proposal_value is null or proposal_value >= 0),
  currency text not null default 'BRL' check (currency ~ '^[A-Z]{3}$'),
  loss_reason text,
  closed_at timestamptz,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint opportunities_org_id_unique unique (organization_id, id),
  constraint opportunities_lead_fkey foreign key (organization_id, lead_id)
    references public.leads(organization_id, id) on delete cascade,
  constraint opportunities_owner_fkey foreign key (organization_id, owner_member_id)
    references public.members(organization_id, id) on delete restrict,
  constraint opportunities_loss_reason_check check (
    stage <> 'lost' or nullif(btrim(loss_reason), '') is not null
  )
);

create index opportunities_org_stage_updated_idx
  on public.opportunities (organization_id, stage, updated_at desc);
create index opportunities_org_owner_next_action_idx
  on public.opportunities (organization_id, owner_member_id, next_action_at)
  where stage not in ('won', 'lost');
create index opportunities_org_lead_idx
  on public.opportunities (organization_id, lead_id, created_at desc);

create table public.activities (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  lead_id uuid not null,
  opportunity_id uuid,
  actor_user_id uuid references auth.users(id) on delete set null default auth.uid(),
  type text not null check (
    type in ('call', 'note', 'stage_change', 'whatsapp_manual', 'task', 'preview')
  ),
  call_outcome text check (
    call_outcome is null or call_outcome in (
      'no_answer', 'no_decision', 'interested', 'declined', 'invalid_number'
    )
  ),
  summary text,
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint activities_lead_fkey foreign key (organization_id, lead_id)
    references public.leads(organization_id, id) on delete cascade,
  constraint activities_opportunity_fkey foreign key (organization_id, opportunity_id)
    references public.opportunities(organization_id, id) on delete cascade,
  constraint activities_call_outcome_check check (
    (type = 'call' and call_outcome is not null)
    or (type <> 'call' and call_outcome is null)
  )
);

create index activities_org_occurred_idx
  on public.activities (organization_id, occurred_at desc);
create index activities_org_lead_occurred_idx
  on public.activities (organization_id, lead_id, occurred_at desc);
create index activities_org_call_outcome_idx
  on public.activities (organization_id, call_outcome, occurred_at desc)
  where type = 'call';
create index activities_opportunity_idx
  on public.activities (opportunity_id, occurred_at desc)
  where opportunity_id is not null;

create table public.previews (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  lead_id uuid not null,
  opportunity_id uuid not null,
  requested_by_member_id uuid,
  assigned_to_member_id uuid,
  status text not null default 'requested'
    check (status in ('requested', 'in_progress', 'ready', 'presented', 'canceled')),
  url text,
  notes text,
  requested_at timestamptz not null default now(),
  ready_at timestamptz,
  presented_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint previews_org_id_unique unique (organization_id, id),
  constraint previews_lead_fkey foreign key (organization_id, lead_id)
    references public.leads(organization_id, id) on delete cascade,
  constraint previews_opportunity_fkey foreign key (organization_id, opportunity_id)
    references public.opportunities(organization_id, id) on delete cascade,
  constraint previews_requested_by_fkey foreign key (organization_id, requested_by_member_id)
    references public.members(organization_id, id) on delete restrict,
  constraint previews_assigned_to_fkey foreign key (organization_id, assigned_to_member_id)
    references public.members(organization_id, id) on delete restrict,
  constraint previews_ready_url_check check (
    status not in ('ready', 'presented') or nullif(btrim(url), '') is not null
  )
);

create unique index previews_one_active_per_opportunity
  on public.previews (organization_id, opportunity_id)
  where status in ('requested', 'in_progress', 'ready');
create index previews_org_assignee_status_idx
  on public.previews (organization_id, assigned_to_member_id, status, updated_at desc);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  lead_id uuid,
  opportunity_id uuid,
  preview_id uuid,
  assigned_to_member_id uuid,
  type text not null check (
    type in ('follow_up', 'call', 'produce_preview', 'present_preview', 'message', 'other')
  ),
  title text not null check (char_length(btrim(title)) between 2 and 180),
  description text,
  status text not null default 'todo' check (status in ('todo', 'in_progress', 'done', 'canceled')),
  due_at timestamptz,
  completed_at timestamptz,
  automation_key text,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint tasks_org_id_unique unique (organization_id, id),
  constraint tasks_lead_fkey foreign key (organization_id, lead_id)
    references public.leads(organization_id, id) on delete cascade,
  constraint tasks_opportunity_fkey foreign key (organization_id, opportunity_id)
    references public.opportunities(organization_id, id) on delete cascade,
  constraint tasks_preview_fkey foreign key (organization_id, preview_id)
    references public.previews(organization_id, id) on delete cascade,
  constraint tasks_assignee_fkey foreign key (organization_id, assigned_to_member_id)
    references public.members(organization_id, id) on delete restrict
);

create unique index tasks_automation_key_unique
  on public.tasks (organization_id, automation_key)
  where automation_key is not null;
create index tasks_org_assignee_open_due_idx
  on public.tasks (organization_id, assigned_to_member_id, due_at)
  where status in ('todo', 'in_progress');
create index tasks_org_status_updated_idx
  on public.tasks (organization_id, status, updated_at desc);
create index tasks_lead_idx on public.tasks (lead_id) where lead_id is not null;
create index tasks_opportunity_idx on public.tasks (opportunity_id) where opportunity_id is not null;
create index tasks_preview_idx on public.tasks (preview_id) where preview_id is not null;

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  lead_id uuid not null,
  contact_id uuid not null,
  opportunity_id uuid,
  channel text not null default 'whatsapp' check (channel = 'whatsapp'),
  external_thread_id text,
  status text not null default 'open' check (status in ('open', 'closed', 'archived')),
  sync_status text not null default 'unavailable'
    check (sync_status in ('synced', 'manual', 'partial', 'unavailable')),
  coverage_start_at timestamptz,
  coverage_end_at timestamptz,
  last_message_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint conversations_org_id_unique unique (organization_id, id),
  constraint conversations_lead_fkey foreign key (organization_id, lead_id)
    references public.leads(organization_id, id) on delete cascade,
  constraint conversations_contact_fkey foreign key (organization_id, contact_id)
    references public.contacts(organization_id, id) on delete cascade,
  constraint conversations_opportunity_fkey foreign key (organization_id, opportunity_id)
    references public.opportunities(organization_id, id) on delete restrict,
  constraint conversations_coverage_check check (
    coverage_start_at is null or coverage_end_at is null or coverage_end_at >= coverage_start_at
  )
);

create unique index conversations_external_thread_unique
  on public.conversations (organization_id, channel, external_thread_id)
  where external_thread_id is not null;
create index conversations_org_status_last_message_idx
  on public.conversations (organization_id, status, last_message_at desc nulls last);
create index conversations_contact_idx on public.conversations (contact_id, created_at desc);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  conversation_id uuid not null,
  external_message_id text,
  direction text not null check (direction in ('inbound', 'outbound', 'system')),
  status text not null default 'pending'
    check (status in ('pending', 'sent', 'delivered', 'read', 'failed', 'uncertain', 'manual')),
  message_type text not null
    check (message_type in ('text', 'image', 'document', 'audio', 'template', 'note')),
  text_body text,
  media_storage_path text,
  media_mime_type text,
  template_name text,
  reply_to_external_id text,
  provider_error text,
  source text not null default 'manual' check (source in ('meta', 'manual', 'system')),
  occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint messages_conversation_fkey foreign key (organization_id, conversation_id)
    references public.conversations(organization_id, id) on delete cascade,
  constraint messages_content_check check (
    text_body is not null or media_storage_path is not null or template_name is not null
  )
);

create unique index messages_external_id_unique
  on public.messages (organization_id, external_message_id)
  where external_message_id is not null;
create index messages_conversation_occurred_idx
  on public.messages (conversation_id, occurred_at desc, id);
create index messages_org_status_idx
  on public.messages (organization_id, status, updated_at desc)
  where status in ('pending', 'failed', 'uncertain');

create table public.knowledge_documents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  title text not null check (char_length(btrim(title)) between 2 and 180),
  slug text not null check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  category text not null default 'playbook',
  content text not null check (char_length(btrim(content)) > 0),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  updated_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint knowledge_documents_org_slug_unique unique (organization_id, slug),
  constraint knowledge_documents_publish_check check (
    status <> 'published' or published_at is not null
  )
);

create index knowledge_documents_org_status_idx
  on public.knowledge_documents (organization_id, status, updated_at desc);

create table public.integration_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  provider text not null check (char_length(btrim(provider)) > 0),
  external_event_id text not null check (char_length(btrim(external_event_id)) > 0),
  event_type text not null check (char_length(btrim(event_type)) > 0),
  status text not null default 'received'
    check (status in ('received', 'processing', 'processed', 'failed', 'ignored')),
  payload jsonb not null default '{}'::jsonb,
  error text,
  attempts integer not null default 0 check (attempts >= 0),
  received_at timestamptz not null default now(),
  processed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint integration_events_provider_external_unique unique (provider, external_event_id)
);

create index integration_events_processing_idx
  on public.integration_events (status, received_at)
  where status in ('received', 'failed');
create index integration_events_org_received_idx
  on public.integration_events (organization_id, received_at desc)
  where organization_id is not null;

create table public.app_settings (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  key text not null check (key ~ '^[a-z0-9]+(?:[._-][a-z0-9]+)*$'),
  value jsonb not null,
  description text,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  updated_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint app_settings_org_key_unique unique (organization_id, key)
);

comment on column public.leads.source_reference is
  'Provider reference only (for Google Places, persist place_id; do not persist returned catalog details here).';
comment on table public.app_settings is
  'Non-secret operational configuration. Provider access tokens remain in server environment variables.';
comment on table public.integration_events is
  'Durable integration inbox. Payload access is restricted to the service role and organization admins.';

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function private.normalize_member_invite()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.invited_email = nullif(lower(btrim(new.invited_email)), '');
  if new.status = 'active' and new.accepted_at is null then
    new.accepted_at = now();
  end if;
  return new;
end;
$$;

create or replace function private.normalize_opportunity_dates()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.stage in ('won', 'lost') then
    new.closed_at = coalesce(new.closed_at, now());
    new.next_action = null;
    new.next_action_at = null;
  elsif tg_op = 'UPDATE' and old.stage in ('won', 'lost') then
    new.closed_at = null;
  end if;
  return new;
end;
$$;

create or replace function private.normalize_task_dates()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.status = 'done' then
    new.completed_at = coalesce(new.completed_at, now());
  elsif tg_op = 'UPDATE' and old.status = 'done' then
    new.completed_at = null;
  end if;
  return new;
end;
$$;

create or replace function private.normalize_preview_dates()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.status in ('ready', 'presented') then
    new.ready_at = coalesce(new.ready_at, now());
  end if;
  if new.status = 'presented' then
    new.presented_at = coalesce(new.presented_at, now());
  end if;
  return new;
end;
$$;

create or replace function private.prevent_organization_change()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.organization_id is distinct from old.organization_id then
    raise exception 'organization_id is immutable' using errcode = '22000';
  end if;
  return new;
end;
$$;

create or replace function private.is_org_member(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select (select auth.uid()) is not null and exists (
    select 1
    from public.members m
    where m.organization_id = target_organization_id
      and m.user_id = (select auth.uid())
      and m.status = 'active'
  );
$$;

create or replace function private.has_org_role(
  target_organization_id uuid,
  allowed_roles text[]
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select (select auth.uid()) is not null and exists (
    select 1
    from public.members m
    where m.organization_id = target_organization_id
      and m.user_id = (select auth.uid())
      and m.status = 'active'
      and m.role = any(allowed_roles)
  );
$$;

create or replace function private.can_access_storage_object(object_name text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select (select auth.uid()) is not null and exists (
    select 1
    from public.members m
    where m.user_id = (select auth.uid())
      and m.status = 'active'
      and m.organization_id::text = split_part(object_name, '/', 1)
  );
$$;

create or replace function public.claim_membership_invitation()
returns setof public.members
language plpgsql
security definer
set search_path = ''
as $$
declare
  requester_id uuid := auth.uid();
  requester_email text := lower(auth.jwt() ->> 'email');
begin
  if requester_id is null or requester_email is null then
    raise exception 'authentication required' using errcode = '42501';
  end if;

  return query
  update public.members m
  set user_id = requester_id,
      status = 'active',
      accepted_at = coalesce(m.accepted_at, now()),
      updated_at = now()
  where m.user_id is null
    and m.status = 'invited'
    and lower(m.invited_email) = requester_email
    and not exists (
      select 1
      from public.members existing
      where existing.organization_id = m.organization_id
        and existing.user_id = requester_id
    )
  returning m.*;
end;
$$;

create or replace function private.create_preview_tasks()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  opportunity_owner uuid;
begin
  if tg_op = 'INSERT' then
    insert into public.tasks (
      organization_id, lead_id, opportunity_id, preview_id, assigned_to_member_id,
      type, title, status, automation_key, created_by
    ) values (
      new.organization_id, new.lead_id, new.opportunity_id, new.id, new.assigned_to_member_id,
      'produce_preview', 'Produzir preview para o lead', 'todo',
      'preview:' || new.id::text || ':produce', auth.uid()
    )
    on conflict (organization_id, automation_key)
      where automation_key is not null
      do nothing;

    update public.opportunities
    set stage = 'preview_in_production'
    where organization_id = new.organization_id
      and id = new.opportunity_id
      and stage in ('new', 'contacting', 'interested');
  end if;

  if tg_op = 'UPDATE' and old.status is distinct from new.status and new.status = 'ready' then
    select o.owner_member_id
    into opportunity_owner
    from public.opportunities o
    where o.organization_id = new.organization_id and o.id = new.opportunity_id;

    update public.tasks
    set status = 'done', completed_at = coalesce(completed_at, now())
    where organization_id = new.organization_id
      and automation_key = 'preview:' || new.id::text || ':produce';

    insert into public.tasks (
      organization_id, lead_id, opportunity_id, preview_id, assigned_to_member_id,
      type, title, status, automation_key, created_by
    ) values (
      new.organization_id, new.lead_id, new.opportunity_id, new.id, opportunity_owner,
      'present_preview', 'Apresentar preview ao lead', 'todo',
      'preview:' || new.id::text || ':present', auth.uid()
    )
    on conflict (organization_id, automation_key)
      where automation_key is not null
      do nothing;
  end if;

  if tg_op = 'UPDATE' and old.status is distinct from new.status and new.status = 'presented' then
    update public.tasks
    set status = 'done', completed_at = coalesce(completed_at, now())
    where organization_id = new.organization_id
      and automation_key = 'preview:' || new.id::text || ':present';

    update public.opportunities
    set stage = 'preview_sent'
    where organization_id = new.organization_id
      and id = new.opportunity_id
      and stage = 'preview_in_production';
  end if;

  return new;
end;
$$;

create or replace function private.sync_conversation_last_message()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.conversations
  set last_message_at = greatest(coalesce(last_message_at, new.occurred_at), new.occurred_at)
  where organization_id = new.organization_id and id = new.conversation_id;
  return new;
end;
$$;

create trigger organizations_set_updated_at
before update on public.organizations
for each row execute function private.set_updated_at();
create trigger members_normalize_invite
before insert or update on public.members
for each row execute function private.normalize_member_invite();
create trigger members_set_updated_at
before update on public.members
for each row execute function private.set_updated_at();
create trigger opportunities_normalize_dates
before insert or update on public.opportunities
for each row execute function private.normalize_opportunity_dates();
create trigger tasks_normalize_dates
before insert or update on public.tasks
for each row execute function private.normalize_task_dates();
create trigger previews_normalize_dates
before insert or update on public.previews
for each row execute function private.normalize_preview_dates();

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'leads', 'contacts', 'opportunities', 'previews', 'tasks', 'conversations',
    'messages', 'knowledge_documents', 'integration_events', 'app_settings'
  ]
  loop
    execute format(
      'create trigger %I_set_updated_at before update on public.%I for each row execute function private.set_updated_at()',
      table_name,
      table_name
    );
  end loop;

  foreach table_name in array array[
    'members', 'leads', 'contacts', 'opportunities', 'previews', 'tasks',
    'conversations', 'messages', 'knowledge_documents', 'app_settings'
  ]
  loop
    execute format(
      'create trigger %I_prevent_org_change before update on public.%I for each row execute function private.prevent_organization_change()',
      table_name,
      table_name
    );
  end loop;
end;
$$;

create trigger previews_create_tasks
after insert or update of status on public.previews
for each row execute function private.create_preview_tasks();
create trigger messages_sync_conversation
after insert or update of occurred_at on public.messages
for each row execute function private.sync_conversation_last_message();

alter table public.organizations enable row level security;
alter table public.members enable row level security;
alter table public.leads enable row level security;
alter table public.contacts enable row level security;
alter table public.opportunities enable row level security;
alter table public.activities enable row level security;
alter table public.previews enable row level security;
alter table public.tasks enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.knowledge_documents enable row level security;
alter table public.integration_events enable row level security;
alter table public.app_settings enable row level security;

create policy organizations_select_member on public.organizations
for select to authenticated
using ((select private.is_org_member(id)));
create policy organizations_update_admin on public.organizations
for update to authenticated
using ((select private.has_org_role(id, array['admin'])))
with check ((select private.has_org_role(id, array['admin'])));

create policy members_select_org on public.members
for select to authenticated
using ((select private.is_org_member(organization_id)));
create policy members_insert_admin on public.members
for insert to authenticated
with check (
  (select private.has_org_role(organization_id, array['admin']))
  and invited_by = (select auth.uid())
);
create policy members_update_admin on public.members
for update to authenticated
using ((select private.has_org_role(organization_id, array['admin'])))
with check ((select private.has_org_role(organization_id, array['admin'])));

create policy leads_select_member on public.leads
for select to authenticated using ((select private.is_org_member(organization_id)));
create policy leads_insert_member on public.leads
for insert to authenticated with check (
  (select private.is_org_member(organization_id)) and created_by = (select auth.uid())
);
create policy leads_update_member on public.leads
for update to authenticated
using ((select private.is_org_member(organization_id)))
with check ((select private.is_org_member(organization_id)));

create policy contacts_select_member on public.contacts
for select to authenticated using ((select private.is_org_member(organization_id)));
create policy contacts_insert_member on public.contacts
for insert to authenticated with check (
  (select private.is_org_member(organization_id)) and created_by = (select auth.uid())
);
create policy contacts_update_member on public.contacts
for update to authenticated
using ((select private.is_org_member(organization_id)))
with check ((select private.is_org_member(organization_id)));

create policy opportunities_select_member on public.opportunities
for select to authenticated using ((select private.is_org_member(organization_id)));
create policy opportunities_insert_member on public.opportunities
for insert to authenticated with check (
  (select private.is_org_member(organization_id)) and created_by = (select auth.uid())
);
create policy opportunities_update_member on public.opportunities
for update to authenticated
using ((select private.is_org_member(organization_id)))
with check ((select private.is_org_member(organization_id)));

create policy activities_select_member on public.activities
for select to authenticated using ((select private.is_org_member(organization_id)));
create policy activities_insert_member on public.activities
for insert to authenticated with check (
  (select private.is_org_member(organization_id)) and actor_user_id = (select auth.uid())
);

create policy previews_select_member on public.previews
for select to authenticated using ((select private.is_org_member(organization_id)));
create policy previews_insert_member on public.previews
for insert to authenticated with check ((select private.is_org_member(organization_id)));
create policy previews_update_member on public.previews
for update to authenticated
using ((select private.is_org_member(organization_id)))
with check ((select private.is_org_member(organization_id)));

create policy tasks_select_member on public.tasks
for select to authenticated using ((select private.is_org_member(organization_id)));
create policy tasks_insert_member on public.tasks
for insert to authenticated with check (
  (select private.is_org_member(organization_id)) and created_by = (select auth.uid())
);
create policy tasks_update_member on public.tasks
for update to authenticated
using ((select private.is_org_member(organization_id)))
with check ((select private.is_org_member(organization_id)));

create policy conversations_select_member on public.conversations
for select to authenticated using ((select private.is_org_member(organization_id)));
create policy conversations_insert_member on public.conversations
for insert to authenticated with check ((select private.is_org_member(organization_id)));
create policy conversations_update_member on public.conversations
for update to authenticated
using ((select private.is_org_member(organization_id)))
with check ((select private.is_org_member(organization_id)));

create policy messages_select_member on public.messages
for select to authenticated using ((select private.is_org_member(organization_id)));
create policy messages_insert_manual on public.messages
for insert to authenticated with check (
  (select private.is_org_member(organization_id))
  and source = 'manual'
  and status = 'manual'
);
create policy messages_update_member on public.messages
for update to authenticated
using ((select private.is_org_member(organization_id)))
with check ((select private.is_org_member(organization_id)));

create policy knowledge_select_member on public.knowledge_documents
for select to authenticated using (
  (status = 'published' and (select private.is_org_member(organization_id)))
  or (select private.has_org_role(organization_id, array['admin']))
);
create policy knowledge_insert_admin on public.knowledge_documents
for insert to authenticated with check (
  (select private.has_org_role(organization_id, array['admin']))
  and created_by = (select auth.uid())
  and updated_by = (select auth.uid())
);
create policy knowledge_update_admin on public.knowledge_documents
for update to authenticated
using ((select private.has_org_role(organization_id, array['admin'])))
with check (
  (select private.has_org_role(organization_id, array['admin']))
  and updated_by = (select auth.uid())
);

create policy integration_events_select_admin on public.integration_events
for select to authenticated using (
  organization_id is not null
  and (select private.has_org_role(organization_id, array['admin']))
);

create policy app_settings_admin on public.app_settings
for all to authenticated
using ((select private.has_org_role(organization_id, array['admin'])))
with check ((select private.has_org_role(organization_id, array['admin'])));

grant usage on schema public to authenticated;
grant usage on schema private to authenticated;
grant select, update on public.organizations to authenticated;
grant select, insert, update on public.members to authenticated;
grant select, insert, update on public.leads to authenticated;
grant select, insert, update on public.contacts to authenticated;
grant select, insert, update on public.opportunities to authenticated;
grant select, insert on public.activities to authenticated;
grant select, insert, update on public.previews to authenticated;
grant select, insert, update on public.tasks to authenticated;
grant select, insert, update on public.conversations to authenticated;
grant select, insert, update on public.messages to authenticated;
grant select, insert, update on public.knowledge_documents to authenticated;
grant select on public.integration_events to authenticated;
grant select, insert, update, delete on public.app_settings to authenticated;

revoke all on function private.set_updated_at() from public, anon, authenticated;
revoke all on function private.normalize_member_invite() from public, anon, authenticated;
revoke all on function private.normalize_opportunity_dates() from public, anon, authenticated;
revoke all on function private.normalize_task_dates() from public, anon, authenticated;
revoke all on function private.normalize_preview_dates() from public, anon, authenticated;
revoke all on function private.prevent_organization_change() from public, anon, authenticated;
revoke all on function private.create_preview_tasks() from public, anon, authenticated;
revoke all on function private.sync_conversation_last_message() from public, anon, authenticated;
revoke all on function private.is_org_member(uuid) from public, anon;
revoke all on function private.has_org_role(uuid, text[]) from public, anon;
revoke all on function private.can_access_storage_object(text) from public, anon;
grant execute on function private.is_org_member(uuid) to authenticated;
grant execute on function private.has_org_role(uuid, text[]) to authenticated;
grant execute on function private.can_access_storage_object(text) to authenticated;
revoke all on function public.claim_membership_invitation() from public, anon;
grant execute on function public.claim_membership_invitation() to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'operation-attachments',
  'operation-attachments',
  false,
  20971520,
  array[
    'image/jpeg', 'image/png', 'image/webp', 'application/pdf',
    'audio/mpeg', 'audio/mp4', 'audio/ogg', 'audio/webm'
  ]
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

create policy operation_attachments_select on storage.objects
for select to authenticated
using (
  bucket_id = 'operation-attachments'
  and (select private.can_access_storage_object(name))
);
create policy operation_attachments_insert on storage.objects
for insert to authenticated
with check (
  bucket_id = 'operation-attachments'
  and (select private.can_access_storage_object(name))
);
create policy operation_attachments_update on storage.objects
for update to authenticated
using (
  bucket_id = 'operation-attachments'
  and (select private.can_access_storage_object(name))
)
with check (
  bucket_id = 'operation-attachments'
  and (select private.can_access_storage_object(name))
);

alter publication supabase_realtime add table
  public.tasks,
  public.previews,
  public.conversations,
  public.messages;

commit;

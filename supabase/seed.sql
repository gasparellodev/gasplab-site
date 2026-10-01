-- Local/dev bootstrap. No auth UUID is assumed: the first matching sign-in claims
-- the invitation through public.claim_membership_invitation().
insert into public.organizations (name, slug)
values ('GaspLab', 'gasplab')
on conflict (slug) do update set name = excluded.name;

insert into public.members (
  organization_id,
  invited_email,
  display_name,
  role,
  status
)
select
  organization.id,
  'vinicius@gasplab.com',
  'Vinícius Gasparello',
  'admin',
  'invited'
from public.organizations organization
where organization.slug = 'gasplab'
  and not exists (
    select 1
    from public.members member
    where member.organization_id = organization.id
      and lower(member.invited_email) = 'vinicius@gasplab.com'
  );

insert into public.app_settings (organization_id, key, value, description)
select
  organization.id,
  'whatsapp.sync',
  '{"status":"unavailable","mode":"manual"}'::jsonb,
  'Estado inicial até a coexistência oficial com a Meta ser validada.'
from public.organizations organization
where organization.slug = 'gasplab'
on conflict (organization_id, key) do nothing;

insert into public.knowledge_documents (
  organization_id,
  title,
  slug,
  category,
  content,
  status,
  published_at
)
select
  organization.id,
  'Princípios comerciais da GaspLab',
  'principios-comerciais',
  'playbook',
  E'# Princípios comerciais\n\nEntender o contexto antes de sugerir tecnologia. Registrar decisões e manter a próxima ação clara. Não prometer preço, prazo ou resultado sem informação aprovada.',
  'published',
  now()
from public.organizations organization
where organization.slug = 'gasplab'
on conflict (organization_id, slug) do nothing;

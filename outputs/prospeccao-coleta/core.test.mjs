import test from 'node:test';import assert from 'node:assert/strict';import {phoneDigits,priority,filterLeads,uniqueLeads,dayKey,safeUrl,scripts,DEFAULT_OFFER} from '../../previews/prospeccao/core.js';
test('telefone BR e links inseguros',()=>{assert.equal(phoneDigits('(11) 99713-6176'),'5511997136176');assert.equal(phoneDigits('abc'),'');assert.equal(safeUrl('javascript:alert(1)'),'');});
test('data comercial usa São Paulo',()=>{assert.equal(dayKey(new Date('2026-10-03T01:00:00Z')),'2026-10-02');});
test('não contatar não entra na prioridade e retorno vencido sobe',()=>{let l={phone:'11999999999',rating:4.9,reviewCount:100};assert.equal(priority(l,{stage:'bloqueado'}).score,0);assert.ok(priority(l,{stage:'conversa',nextAt:'2020-01-01'}).score>priority(l,{}).score);});
test('deduplica por place ID e busca sem acento',()=>{let a={id:'a',name:'Floricultura Poá',city:'Poá',niche:'floriculturas',phone:'11999999999'};assert.equal(uniqueLeads([a,a]).length,1);assert.equal(filterLeads([a],{}, {query:'poa',phone:true}).length,1);assert.equal(filterLeads([a],{a:{stage:'conversa'}},{fresh:true}).length,0);});
test('primeira abordagem não inventa preview e usa preço confirmado',()=>{let s=scripts({name:'Loja',niche:'floriculturas'},DEFAULT_OFFER);assert.ok(!s.first.includes('http'));assert.ok(s.proposal.includes('597'));assert.ok(s.proposal.includes('não há garantia'));});


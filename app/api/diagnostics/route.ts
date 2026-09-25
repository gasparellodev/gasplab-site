import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/db";
import { diagnostics } from "@/db/schema";

const schema=z.object({name:z.string().trim().min(2).max(100),company:z.string().trim().min(2).max(120),contact:z.string().trim().min(5).max(160),segment:z.string().trim().min(2).max(100),interest:z.enum(["site","sites","automacao","automacoes","sistema","sistemas","integrado","nao-sei"]),challenge:z.string().trim().min(10).max(2000),url:z.union([z.literal(""),z.string().url().max(300)]).optional(),consent:z.literal(true),website:z.string().max(0).optional(),utmSource:z.string().max(120).optional(),utmMedium:z.string().max(120).optional(),utmCampaign:z.string().max(120).optional()});

export async function POST(request:Request){
  try{const body=await request.json(); const parsed=schema.safeParse(body); if(!parsed.success)return NextResponse.json({ok:false,error:{code:"VALIDATION_ERROR",message:"Revise os campos enviados."}},{status:400}); const {website,...data}=parsed.data; if(website)return NextResponse.json({ok:true}); await getDb().insert(diagnostics).values({id:crypto.randomUUID(),...data,url:data.url||null,utmSource:data.utmSource||null,utmMedium:data.utmMedium||null,utmCampaign:data.utmCampaign||null,status:"new"}); return NextResponse.json({ok:true},{status:201});}
  catch{return NextResponse.json({ok:false,error:{code:"INTERNAL_ERROR",message:"Não foi possível registrar o diagnóstico."}},{status:500});}
}

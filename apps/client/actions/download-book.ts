'use server'

import htmlToDocx from "html-to-docx";

const startDownload = async(html:string)=>{
  return await htmlToDocx(html);
}

export default startDownload;
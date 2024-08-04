import { toast } from "react-hot-toast"

import { apiConnector } from "../apiConnector"
import { catalogData } from "../apis"


export const getCatalogPageData = async (categoryId) => {

  const toastId = toast.loading("Loading...")
  let result = []
  try{
   //send the course id request  to backend function 
   const res = await apiConnector("POST" , catalogData.CATALOGPAGEDATA_API , {
     categoryId:categoryId,
   })
   console.log("Response me mujhe data milega " , res)

   if(!res?.data?.success){
     throw new Error("Could not retriew data ")
   }

   result = res?.data

  }catch(error){
   console.log("CATALOGPAGE DATA API ERROR " ,error)
   toast.error(error.message)
   result = error?.res?.data   
  }
  toast.dismiss(toastId)
  return result
}
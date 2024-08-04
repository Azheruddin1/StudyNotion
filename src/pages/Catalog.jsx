import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// import CourseCard from "../components/Catalog/CourseCard"
// import CourseSlider from "../components/Catalog/CourseSlider"
import Footer from '../components/Common/Footer'
import { apiConnector } from "../services/apiConnector"
import {  categories } from "../services/apis"
import { getCatalogPageData } from "../services/operations/pageAndComponntDatas"
import Course_Slider from "../components/core/Catalog/Course_Slider"
import Course_Card from '../components/core/Catalog/Course_Card'



export default function Catalog(){
     const {catalogName} = useParams();
     const [catalogPageData , setCatalogPageData] = useState(null)
     const [categoryId , setCategoryId] = useState(" ");
     const [active, setActive] = useState(1)
     
     useEffect(() => {
         const getCategory = async () => {
            const res = await apiConnector("GET" , categories.CATEGORIES_API)
            const category_id = res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id)
         }
         getCategory();
     } , [catalogName])

     useEffect(() => {
      
        if(categoryId){
           const getCatalogData = async () => {
           try{
           const  resp = await getCatalogPageData(categoryId)
            setCatalogPageData(resp)
            console.log("CATALOG AAGYA HAI SUCCESS HUYI KI NAHI ",resp)
  
           }catch(error){
            console.log("CATALOG API ERROR IS ===>",error)

           } 
        }
        getCatalogData();
    }    
     },[categoryId])
     
  
     return (
      <>
         {/*Hero section is */ }
        <div className="box-content bg-richblack-800 p-4">
           <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col  justify-center gap-4 lg:max-w-maxContent">
              <p className="text-sm text-richblack-300">
                {`Home / Catalog /`}
                <span className="text-yellow-25">
                    {catalogPageData?.data?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-3xl text-richblack-5">
                {catalogPageData?.data?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-richblack-300">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>
           </div>
        </div>

        {/*Section 1 */}
        <div className="mx-auto box-content w-full max-w-maxContentTab  px-4 py-12 lg:max-w-maxContent">
          <div className="section_heading">Courses to get you started</div>
          <div className="my-4 flex border-b border-richblack-300">
            <p className={`px-4 py-2 ${
                active === 1 ?"border-b border-b-yellow-25 text-yellow-50" : 
                "text-richblack-50"
            } cursor-pointer`} 
            onClick={() => setActive(1)}
            >
                Most Popular 
            </p>
            <p className={`px-4 py-2 ${
                active === 2 ? "border-b border-yellow-25  text-yellow-50" : 
                "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
            >
                New
            </p>
          </div> 

          <div>
          <Course_Slider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
          />
          </div>
        </div>

        {/*Section 2*/}
        <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent ">
           <div className="section_heading">
             Top Courses in {catalogPageData?.data?.differentCategory?.name}
           </div>
           <div className="py-8">
            <Course_Slider 
               Courses={catalogPageData?.data?.differentCategory?.courses}
            />
           </div>
        </div>

        {/*section 3*/}
        <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading"> Frequently Bought </div>
             <div className="py-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                  .map((course , i) => (
                    <Course_Card course={course} key={i}  Height={"h-[400px]"}/>
                  ))
                  }
                </div>
             </div>
         </div>
         <Footer/>
      </>
     )
}  

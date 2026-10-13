import SATMasterclassPage from "@/components/sat-courses/coursesDetail"
import { serverInstance } from "@/services/axiosInstance"

export default async function Page({params}){
    const {slug} = await params

    const res = await serverInstance.get(`/courses/${slug}`)
    const course = res.data.data
   




    return(
        <>
        <SATMasterclassPage CourseDetail = {course} />
        </>
    )
}
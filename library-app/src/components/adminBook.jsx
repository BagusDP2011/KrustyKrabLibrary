import {
    Tr,
    Td,
    Image,
    Button,
    useToast,
  } from "@chakra-ui/react"
  import { axiosInstance } from "../api"
  import { useEffect } from "react"
  import { Link } from "react-router-dom"
  
  const AdminBook = ({
    id,
    image_url,
    title,
    author,
    release_year,
    genre,
    language,
    fetchBooks
  }) => {
  
    const toast = useToast()
    
    const destroyBook = async () => {
      try {
        await axiosInstance.delete(`/book/${id}`)
        fetchBooks()
        toast({ title: "Book removed", status: "success" })
      } catch (err) {
        console.log(err)
        toast({ title: "Please login first", status: "error" })
      }
    } 
    
    const removeBookBtn = () => {
      destroyBook()
    }
  
    useEffect(() => {
      fetchBooks()
    }, [])
  
    return (
      <>
        <Tr>
          <Td>
            <Link to={`/detail/${id}`}>
              <Image maxH={"120px"} src={image_url || ""} />
            </Link>
          </Td>
          <Td>
            <Link to={`/detail/${id}`}>{title}</Link>
          </Td>
          <Td>{author}</Td>
          <Td>{release_year}</Td>
          <Td>{genre}</Td>
          <Td>{language}</Td>
          <Td>
            <Link to={`/admin/detail/${id}`}>
            <Button colorScheme="green" >Edit Book</Button>
            </Link>
            <Button onClick = {removeBookBtn} colorScheme="red" >Remove Book</Button>
          </Td>
        </Tr>
      </>
    )
  }
  
  export default AdminBook
  
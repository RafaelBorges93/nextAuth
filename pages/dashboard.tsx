import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { setupAPIClient } from "../services/api"
import { api } from "../services/apiClient"
import { withSSRAuth } from "../utils/withSSRAuth"

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    api.get('/me')
    .then(response => console.log(response))
    .catch(err => console.log(err));
  }, [])

  return (
    <h1>Dashboard: {user?.email} </h1>
  )
}

export const getServerSideProps = withSSRAuth(async(ctx) => {
  const apiCLient = setupAPIClient(ctx);  
  const response = await apiCLient.get('/me');

  console.log(response)

  return {
    props: {}
  }
})
// dependencies lib
import { Title } from "@solidjs/meta"

// local dependencies
import { AdminNavi } from "@/components/pages/admin"

const AdminHome = () => {
  return (
    <>
      <Title>Admin Page</Title>
      <div class="h-full flex flex-col bg-neutral-700 text-white">
        <div class="shadow-lg mb-2 text-xl py-3 px-5">
          <AdminNavi></AdminNavi>
        </div>
      </div>
    </>
  )
}

export default AdminHome

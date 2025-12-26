import Breadcrumb from "components/Breadcrumb"
import { Page } from "components/shared/Page"
import { Collapse } from "components/ui"
import { useDisclosure } from "hooks"
import { Minus, Plus } from "lucide-react"
import AddLead from "./AddLead"
import { useState } from "react"

const Lead = () => {
    const [isExpanded, {toggle}] = useDisclosure();
    const [data, setData] = useState(null);

    // const handleUpdate = () => {
    //     collapseOpen();
    // }

  return (
    <Page title='Add Lead'>
        <div className="w-full px-(--margin-x) pt-5 lg:pt-6">
            <Breadcrumb 
                title="Add Lead"
                options={[{
                    label: 'Add Lead',
                    SwapOff: Plus,
                    SwapOn: Minus,
                    onClick: toggle,
                    active: isExpanded
                }]}
            />

            <Collapse in={isExpanded}>
                <AddLead data={data} setData={setData} />
            </Collapse>
        </div>
    </Page>
  )
}

export default Lead
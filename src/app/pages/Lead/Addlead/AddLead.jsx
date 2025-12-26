import Inputs from "components/Inputs"
import { Card } from "components/ui"
import { useMemo } from "react"

const AddLead = () => {

    let inputs = useMemo(() => [
        {
            label: 'First Name',
            name: 'firstName',
            type: 'text',
            required: true
        }
    ]);

  return (
    <div>
        <form className="mt-3">
            <Card className='gap-4 p-4 sm:px-5'>
                <div className="grid grid-cols-4 place-content-start gap-2 max-lg:grid-cols-2 max-sm:grid-cols-1 sm:gap-5 lg:gap-6">

                {inputs.map((input, id) =>{
                    <div key={id} className="col-span-2 flex -space-x-px max-sm:col-auto">
                        <Inputs 
                            placeholder={`${input.type === 'select' ? 'Select' : 'Enter'}`}
                        />  
                    </div>
                })}
                </div>
            </Card>
        </form>
    </div>
  )
}

export default AddLead
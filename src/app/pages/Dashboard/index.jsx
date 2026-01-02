import { Page } from "components/shared/Page"
import { Statistics } from "./Statistics"

const index = () => {
  return (
    <Page title="Dashboard">
        <div className="transition-content flex flex-col gap-y-4 overflow-hidden px-(--margin-x) pb-8 sm:gap-y-5 lg:gap-y-6">
        <Statistics />
      </div>
    </Page>
  )
}

export default index
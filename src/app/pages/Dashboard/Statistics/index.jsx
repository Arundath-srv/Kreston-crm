// Local Imports

import { History } from "./History";
import { Overview } from "./Overview";
// import { Source } from "./Source";
import { Status } from "./Status";

export function Statistics() {
  return (
    <div className="mt-5 flex flex-col gap-4 sm:gap-5 lg:mt-6 lg:gap-6">
      <Overview />

      <div className="col-span-12 grid gap-4 sm:order-last sm:col-span-6 sm:gap-5 md:grid-cols-2 lg:col-span-5 lg:gap-6 xl:col-span-4">
        <History />

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
          <Status />
          {/* <Source /> */}
        </div>
      </div>
    </div>
  );
}

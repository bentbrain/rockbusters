import { Card,  CardTitle } from "@/components/ui/card";



export default async function Blocked() {

  return (
    <main className="px-2 md:px-6">
      <div className="max-w-screen-sm w-full grid place-items-center gap-2 mx-auto">
        <div className="">
          
          <Card className="p-4" >
            <CardTitle className="mb-2" >You have been blocked</CardTitle>
            <div>
                <p>You have been blocked from answering this question for a while, please try again later.</p>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

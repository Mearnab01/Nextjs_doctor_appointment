import { TabsContent } from "@/components/ui/tabs";
import {
  getPendingDoctors,
  getVerifiedDoctors,
  getPendingPayouts,
} from "@/actions/admin";

import { VerifiedDoctor } from "./_components/verified-doctor";
import { PendingDoctors } from "./_components/pending-doctors";

export default async function AdminPage() {
  // Fetch all data in parallel
  const [pendingDoctorsData, verifiedDoctorsData, pendingPayoutsData] =
    await Promise.all([
      getPendingDoctors(),
      getVerifiedDoctors(),
      getPendingPayouts(),
    ]);

  return (
    <>
      <TabsContent value="pending" className="border-none p-0">
        <PendingDoctors
          doctors={
            (pendingDoctorsData.doctors || []).filter(
              (d) => d.name !== null
            ) as any
          }
        />
      </TabsContent>

      <TabsContent value="doctors" className="border-none p-0">
        <VerifiedDoctor
          doctors={
            (verifiedDoctorsData.doctors || []).filter(
              (d) => d.name !== null
            ) as any
          }
        />
      </TabsContent>
    </>
  );
}

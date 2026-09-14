import { Card } from '../components/Card'

export function Privacy() {
  return (
    <div className="flex flex-col gap-4 pt-6">
      <h1 className="text-center font-display text-xl text-gold">Privacy — Test Build</h1>
      <Card>
        <p className="text-sm text-mystic-200/80">
          This is a pre-launch test build of Mystic Companion. Here's exactly what happens with
          your data right now, in plain language:
        </p>
      </Card>
      <Card>
        <ul className="flex list-disc flex-col gap-2 pl-4 text-sm text-mystic-200/80">
          <li>Everything you enter (name, birth date, gender, dossier fields) is stored only in your browser's local storage on this device. It is not sent to a server, because this test build doesn't have one yet.</li>
          <li>Nothing is shared with, sold to, or visible to any other tester or third party.</li>
          <li>Clearing your browser data or using a different device/browser will reset your profile — there is no account recovery in this test build.</li>
          <li>This app is intended for testers 18 years and older, since it asks for birth data used in astrology calculations and (in a later version) compatibility readings.</li>
          <li>When a real backend is added for launch, this page will be replaced with a full privacy policy covering real data storage, retention, and your rights.</li>
        </ul>
      </Card>
      <p className="text-center text-[11px] text-mystic-200/40">Questions about this test? Ask whoever sent you the link.</p>
    </div>
  )
}

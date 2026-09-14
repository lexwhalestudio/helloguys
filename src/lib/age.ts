export const MIN_AGE = 18

export function getAge(birthDateIso: string, today: Date = new Date()): number {
  const birth = new Date(birthDateIso)
  let age = today.getFullYear() - birth.getFullYear()
  const hasHadBirthdayThisYear =
    today.getMonth() > birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate())
  if (!hasHadBirthdayThisYear) age -= 1
  return age
}

export const convertToDriverFullName = ({
  id,
  firstName,
  lastName,
}: {
  id?: string
  firstName?: string
  lastName?: string
}) => {
  const fullName = [firstName, lastName].join(' ').trim()
  if (id && fullName) return [id, fullName].join(' - ')
  if (id) return id
  if (fullName) return fullName
}

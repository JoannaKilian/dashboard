export interface Pet {
  id: string,
  name: string,
  sex: string,
  species: string,
  breed?: string,
  dateOfBirth: string,
  vaccinationDate?: string,
}
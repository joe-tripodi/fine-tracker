export async function getAllClubFines(database){
  let fines = await database.getAllClubFines();
  return fines;
}


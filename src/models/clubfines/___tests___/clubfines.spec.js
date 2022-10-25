import { describe, expect, test } from  "vitest"
import {getAllClubFines} from "../clubfines";

const Database = class {
  clubFines = [{
    reason: 'Late to training',
    amount: 10,
  }]

  getAllClubFines() {
    return this.clubFines;
  }
}

describe("test club fines", () => {
  test("it works", async () => {
    const allClubFines = await getAllClubFines(new Database());
    expect(allClubFines.length).toBeGreaterThanOrEqual(1);
    expect(allClubFines[0].reason).toBe("Late to training");
    expect(allClubFines[0].amount).toBe(10);
  })
})

import { describe, it } from 'vitest'
import { runProgram } from './api-example'

describe('test api example', () => {
    it('the output should be the correct string', async () => {
        const response = await runProgram
        expect(response).toBe(
            'George,Janet,Emma,Eve,Charles,Tracey,Michael,Lindsay,Tobias,Byron,George,Rachel\nThe answer was 42 for all of you'
        )
    })
})

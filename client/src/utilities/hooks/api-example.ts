import axios, { AxiosResponse } from 'axios'
import { sequenceT } from 'fp-ts/lib/Apply'
import { flatten, map } from 'fp-ts/lib/Array'
import * as E from 'fp-ts/lib/Either'
import { flow, pipe } from 'fp-ts/lib/function'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import * as t from 'io-ts'
import { failure } from 'io-ts/lib/PathReporter'

// create a schema to load our user data into
const users = t.type({
    data: t.array(
        t.type({
            first_name: t.string,
        })
    ),
})
type Users = t.TypeOf<typeof users>

// schema to hold the deepest of answers
const answer = t.type({
    ans: t.number,
})

// Convert our api call to a TaskEither
const httpGet = (url: string): TE.TaskEither<Error, AxiosResponse> =>
    TE.tryCatch<Error, AxiosResponse>(
        async () => await axios.get(url),
        (reason) => new Error(String(reason))
    )

// function to decode an unknown into an A
const decodeWith = <A>(
    decoder: t.Decoder<unknown, A>
): ((i: unknown) => TE.TaskEither<Error, A>) =>
    flow(
        decoder.decode,
        E.mapLeft((errors) => new Error(failure(errors).join('\n'))),
        TE.fromEither
    )

// takes a url and a decoder and gives you back an Either<Error, A>
const getFromUrl = <A>(
    url: string,
    codec: t.Decoder<unknown, A>
): TE.TaskEither<Error, A> =>
    pipe(
        httpGet(url),
        TE.map((x) => x.data),
        TE.chain(decodeWith(codec))
    )

const getAnswer: TE.TaskEither<Error, { ans: number }> = pipe(
    TE.right({ ans: 42 }),
    TE.chain(decodeWith(answer))
)

const apiUrl = (page: number): string =>
    `https://reqres.in/api/users?page=${page}`

const smashUsersTogether = (users1: Users, users2: Users): string[] =>
    pipe(
        flatten([users1.data, users2.data]),
        map((item) => item.first_name)
    )

export const runProgram: Promise<string> = pipe(
    sequenceT(TE.ApplySeq)(
        getAnswer,
        getFromUrl(apiUrl(1), users),
        getFromUrl(apiUrl(2), users)
    ),
    TE.fold(
        (errors) => T.of(errors.message),
        ([ans, users1, users2]) =>
            T.of(
                smashUsersTogether(users1, users2).join(',') +
                    `\nThe answer was ${ans.ans} for all of you`
            )
    )
)()

import { randomUUID } from 'node:crypto'
import { faker } from '@faker-js/faker'

type Input = {
  usersCount: number
  groupsCount: number
  transactionsPerUserPerGroup: number
}

type Output = {
  usersData: {
    id: string
    firstName: string
    lastName: string
  }[]
  groupsData: {
    id: string
    name: string
    currency: string
    createdBy: string
    createdAt: Date
  }[]
  groupMembersData: {
    groupId: string
    userId: string
    createdAt: Date
  }[]
  groupTransactionsData: {
    id: string
    name: string
    amount: number
    groupId: string
    payerUserId: string
    date: Date
    createdBy: string
    createdAt: Date
  }[]
  groupTransactionParticipantsData: {
    groupTransactionId: string
    userId: string
    amount: number
    payerUserId: string
    groupId: string
  }[]
}

const USER_IDS = [
  '6e3b5efe-9ee1-4b63-917e-ce74312ba93c',
  'eee51c9a-de9f-42c6-8add-15b7097b30a2',
  '5909f340-69fa-4db5-a728-47777e017cf7',
  '85e36457-77ee-412f-9577-8912da5c80c5',
  '75f9f70b-6cc8-4098-85c8-03b3756e2517'
]
const FIRST_GROUP_ID = '41d33f94-d875-4327-b95b-4fa0f1ace8e7'
const FIRST_GROUP_TRANSACTION_ID = '3774d0b4-a268-4864-b90f-a26a9dd4c321'

export function data({ usersCount, groupsCount, transactionsPerUserPerGroup }: Input): Output {
  const usersData = Array.from({ length: usersCount }, (_, i) => ({
    id: USER_IDS[i] ?? randomUUID(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName()
  }))

  enum currencies {
    USD = 'USD',
    EUR = 'EUR',
    BRL = 'BRL'
  }

  const groupsData = Array.from({ length: groupsCount }, (_, i) => ({
    id: i === 0 ? FIRST_GROUP_ID : randomUUID(),
    name: faker.lorem.words(2),
    currency: faker.helpers.enumValue(currencies),
    createdBy: usersData[i % usersCount].id,
    createdAt: faker.date.recent()
  }))

  const groupMembersData = groupsData.flatMap(group =>
    Array.from({ length: usersCount }, (_, i) => ({
      groupId: group.id,
      userId: usersData[i].id,
      createdAt: faker.date.recent()
    }))
  )

  const groupTransactionsData = groupsData.flatMap((group, i) =>
    Array.from({ length: transactionsPerUserPerGroup }, (_, j) => {
      const payerUserId = usersData[j % usersCount].id
      return {
        id: i + j === 0 ? FIRST_GROUP_TRANSACTION_ID : randomUUID(),
        name: faker.lorem.words(2),
        amount: faker.number.int({ max: 100000 }),
        groupId: group.id,
        payerUserId,
        date: faker.date.recent(),
        createdBy: payerUserId,
        createdAt: faker.date.recent()
      }
    })
  )

  const groupTransactionParticipantsData = groupTransactionsData.flatMap(transaction => {
    const amount = Number.parseInt(String(transaction.amount / usersCount))
    return groupMembersData
      .filter(member => member.groupId === transaction.groupId)
      .map(member => ({
        groupTransactionId: transaction.id,
        userId: member.userId,
        amount,
        payerUserId: transaction.payerUserId,
        groupId: transaction.groupId
      }))
  })

  return {
    usersData,
    groupsData,
    groupMembersData,
    groupTransactionsData,
    groupTransactionParticipantsData
  }
}

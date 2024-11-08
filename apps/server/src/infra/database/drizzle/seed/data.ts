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

export function data({ usersCount, groupsCount, transactionsPerUserPerGroup }: Input): Output {
  const usersData = Array.from({ length: usersCount }, () => ({
    id: randomUUID(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName()
  }))

  enum currencies {
    USD = 'USD',
    EUR = 'EUR',
    BRL = 'BRL'
  }

  const groupsData = Array.from({ length: groupsCount }, (_, i) => ({
    id: randomUUID(),
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

  const groupTransactionsData = groupsData.flatMap(group =>
    Array.from({ length: transactionsPerUserPerGroup }, (_, i) => {
      const payerUserId = usersData[i % usersCount].id
      return {
        id: randomUUID(),
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

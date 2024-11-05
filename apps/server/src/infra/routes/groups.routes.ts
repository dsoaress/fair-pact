import { groupsFactory } from '@/modules/groups/groups.factory'
import type { FastifyInstance } from 'fastify'

// import type { CreateGroupMemberDto } from '@/modules/groups/dtos/create-group-member.dto'
// import type { CreateGroupTransactionDto } from '@/modules/groups/dtos/create-group-transaction.dto'
// import type { CreateGroupDto } from '@/modules/groups/dtos/create-group.dto'
// import type { UpdateGroupTransactionDto } from '@/modules/groups/dtos/update-group-transaction.dto'
// import type { UpdateGroupDto } from '@/modules/groups/dtos/update-group.dto'
// import { groupMembersFactory } from '@/modules/groups/factories/group-members.factory'
// import { groupTransactionsFactory } from '@/modules/groups/factories/group-transactions.factory'
// import { groupsFactory } from '@/modules/groups/factories/groups.factory'
// import { db } from '../database/drizzle/drizzle.service'
// import { DrizzleGroupMembersRepository } from '../database/drizzle/repositories/groups/drizzle-group-members.repository'
// import { DrizzleGroupTransactionsRepository } from '../database/drizzle/repositories/groups/drizzle-group-transaction.repository'
// import { DrizzleGroupsRepository } from '../database/drizzle/repositories/groups/drizzle-groups.repository'
// import { DrizzleGroupsDao } from '../database/drizzle/daos/groups/drizzle-groups.dao'

// type MemberResults = {
//   [memberId: string]: {
//     credits: { memberId: string; amount: number }[]
//     debits: { memberId: string; amount: number }[]
//   }
// }

// type Transaction = {
//   payerMemberId: string
//   groupTransactionParticipants: {
//     memberId: string
//     amount: number
//   }[]
// }

// class Test {
//   execute(result: Transaction[], members: string[]): MemberResults {
//     const memberResults: MemberResults = {}
//     for (const memberId of members) {
//       memberResults[memberId] = {
//         credits: [],
//         debits: []
//       }
//     }

//     this.processTransactions(result, memberResults)

//     // Removemos a chamada para adjustCreditAmounts
//     // this.adjustCreditAmounts(memberResults);

//     this.simplifyMemberBalances(memberResults)

//     return memberResults
//   }

//   private processTransactions(transactions: Transaction[], memberResults: MemberResults): void {
//     for (const transaction of transactions) {
//       const payerId = transaction.payerMemberId
//       const participants = transaction.groupTransactionParticipants

//       for (const participant of participants) {
//         const participantId = participant.memberId
//         const amount = participant.amount

//         if (participantId !== payerId) {
//           this.updateDebits(memberResults, participantId, payerId, amount)
//           this.updateCredits(memberResults, payerId, participantId, amount)
//         }
//       }
//     }
//   }

//   private updateDebits(
//     memberResults: MemberResults,
//     debtorId: string,
//     creditorId: string,
//     amount: number
//   ): void {
//     const debtorDebits = memberResults[debtorId].debits
//     const existingDebit = debtorDebits.find(debit => debit.memberId === creditorId)
//     if (existingDebit) {
//       existingDebit.amount += amount
//     } else {
//       debtorDebits.push({
//         memberId: creditorId,
//         amount
//       })
//     }
//   }

//   private updateCredits(
//     memberResults: MemberResults,
//     creditorId: string,
//     debtorId: string,
//     amount: number
//   ): void {
//     const creditorCredits = memberResults[creditorId].credits
//     const existingCredit = creditorCredits.find(credit => credit.memberId === debtorId)
//     if (existingCredit) {
//       existingCredit.amount += amount
//     } else {
//       creditorCredits.push({
//         memberId: debtorId,
//         amount
//       })
//     }
//   }

//   // Nova função para simplificar os saldos entre membros
//   private simplifyMemberBalances(memberResults: MemberResults): void {
//     for (const memberId in memberResults) {
//       const memberData = memberResults[memberId]
//       const balanceMap: { [otherMemberId: string]: number } = {}

//       // Combina créditos e débitos em balanceMap
//       for (const credit of memberData.credits) {
//         balanceMap[credit.memberId] = (balanceMap[credit.memberId] || 0) + credit.amount
//       }

//       for (const debit of memberData.debits) {
//         balanceMap[debit.memberId] = (balanceMap[debit.memberId] || 0) - debit.amount
//         // Subtraímos o valor do débito porque o membro deve dinheiro ao outro membro
//       }

//       // Reconstrói créditos e débitos com base nos saldos líquidos
//       const simplifiedCredits: { memberId: string; amount: number }[] = []
//       const simplifiedDebits: { memberId: string; amount: number }[] = []

//       for (const otherMemberId in balanceMap) {
//         const netAmount = balanceMap[otherMemberId]
//         if (netAmount > 0) {
//           // Membro tem a receber do outro membro
//           simplifiedCredits.push({ memberId: otherMemberId, amount: netAmount })
//         } else if (netAmount < 0) {
//           // Membro deve ao outro membro
//           simplifiedDebits.push({ memberId: otherMemberId, amount: -netAmount })
//         }
//         // Se netAmount === 0, omitimos, pois os valores se cancelam
//       }

//       memberData.credits = simplifiedCredits
//       memberData.debits = simplifiedDebits
//     }
//   }
// }

// export async function groupRoutes(app: FastifyInstance): Promise<void> {
//   const groupsDao = new DrizzleGroupsDao()
//   const groupsRepository = new DrizzleGroupsRepository()
//   const groupMembersRepository = new DrizzleGroupMembersRepository()
//   const groupTransactionsRepository = new DrizzleGroupTransactionsRepository()
//   const groupsController = groupsFactory(groupsDao, groupsRepository, groupMembersRepository)
//   const groupMembersController = groupMembersFactory()
//   const groupTransactionsController = groupTransactionsFactory(
//     groupsRepository,
//     groupTransactionsRepository
//   )

//   // app.get('/groups', async (_request, reply) => {
//   //   const group = await db.query.groups.findFirst({
//   //     with: {
//   //       groupMembers: {
//   //         with: {
//   //           user: {
//   //             columns: {
//   //               firstName: true,
//   //               lastName: true
//   //             }
//   //           }
//   //         }
//   //       }
//   //     }
//   //   })
//   //   const result = await db.query.groupTransactions.findMany({
//   //     with: {
//   //       groupTransactionParticipants: true
//   //     }
//   //   })

//   //   const members: string[] = group?.groupMembers.map(member => member.id) ?? []
//   //   const memberNames: { [memberId: string]: string } = {}

//   //   for (const member of group?.groupMembers ?? []) {
//   //     memberNames[member.id] = `${member.user.firstName} ${member.user.lastName}`
//   //   }

//   //   const memberResults = new Test().execute(result, members)

//   //   reply.send({ memberNames, memberResults, group, result })
//   // })
//   //
// }

export function groupsRoutes(app: FastifyInstance): void {
  const { groupRoutes, groupMembersRoutes, groupTransactionsRoutes } = groupsFactory()
  const { createGroup, deleteGroup, getGroupById, getGroups, updateGroup } = groupRoutes
  const { createGroupMember, deleteGroupMember } = groupMembersRoutes
  const { createGroupTransaction, deleteGroupTransaction, updateGroupTransaction } =
    groupTransactionsRoutes

  app.get('/groups', getGroups.bind(groupRoutes))
  app.get('/groups/:id', getGroupById.bind(groupRoutes))
  app.post('/groups', createGroup.bind(groupRoutes))
  app.patch('/groups/:id', updateGroup.bind(groupRoutes))
  app.delete('/groups/:id', deleteGroup.bind(groupRoutes))

  app.post('/groups/members', createGroupMember.bind(groupMembersRoutes))
  app.delete('/groups/members/:id', deleteGroupMember.bind(groupMembersRoutes))

  app.post('/groups/transactions', createGroupTransaction.bind(groupTransactionsRoutes))
  app.patch('/groups/transactions/:id', updateGroupTransaction.bind(groupTransactionsRoutes))
  app.delete('/groups/transactions/:id', deleteGroupTransaction.bind(groupTransactionsRoutes))
}

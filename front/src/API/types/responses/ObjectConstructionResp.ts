type ObjectConstructionResp = {
    id: number,
    customer: Customer,
    price: number,
    workName: string,
    workDescription: string,
    availableVacancies: string,
    workers: Client[],
    professions: ProfessionResp[]
}
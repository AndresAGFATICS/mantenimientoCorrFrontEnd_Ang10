export class Tarea {
    assignee: string;
    caseDefinitionId?: string;
    caseExecutionId?: string;
    caseInstanceId?: string;
    created: Date;
    delegationState?: string;
    description?: string;
    due?: string;
    executionId: string
    followUp?: string;
    formKey: string;
    id: string;
    name: string;
    owner?: string;
    parentTaskId: string;
    priority: number;
    processDefinitionId: string;
    processInstanceId: string;
    suspended: boolean;
    taskDefinitionKey: string;
    tenantId?: string;
}
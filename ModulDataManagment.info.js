/**
 * ModulDataManagement
 */
let General = {
    Rules: {
        Database: {
            Tables: {
                1: 'Id standard name: SomethingId',
                2: 'FK standard name: SomethingFK'
            },
            Structrures: {
                CardContainer: {
                    1: 'Table name - optional: foreign table [table_name]',
                    2: 'Column name - required: selected column [TableIdwithout"Id"1.Name].'
                }
            }
        }
    }
}

let TaskManager = {
    Database: {
        Tables: {
            tasks: {
                Category: 'Main table',
                Required: {
                    Own: {
                        'Id - int(11)': TaskId,
                        'Task name - varchar(30)': Name
                    },
                    ProjectManager: {
                        'Created date - datetime': CreatedDate,
                        'Deadline - datetime': Deadline,
                        'Finish date - datetime': FinishDate
                    }
                },
                Opportunities: {
                    Own: {
                        'Description - text': Description
                    },
                    Foreign: {
                        'Task category - int(11)': TaskCategoryFK,
                        'Task type - int(11)': TaskTypeFK,
                        'Order - int(11)': OrderFK,
                        'Project - int(11)': ProjectFK
                    }
                }
            },
            task_categories: {
                Category: 'Sub table',
                Required: {
                    'Id - int(11)': TaskCategoryId,
                    'Level - int(2)': Level,
                    'Name - varchar(30)': Name,
                    'Parent - int(11)': ParentFK
                }
            },
            task_steps: {
                Category: 'Sub table',
                Required: {
                    'Task step - int(11)': TaskStepId,
                    'Name - varchar(30)': Name
                }
            },
            task_types: {
                Category: 'Sub table',
                Required: {
                    'Task step - int(11)': TaskTypeId,
                    'Name - varchar(30)': Name
                }
            },
            task_ways: {
                Category: 'Big table',
                Required: {
                    Own: {
                        'Task way - int(11)': TaskWayId,
                        'Number - int(11)': Number,
                        'Active - tinyint(1)': Active,
                        'Ready - tinyint(1)': Ready
                    },
                    Foreign: {
                        'Task': TaskFK,
                        'Task step': TaskStepFK
                    }
                },
                Opportunities: {
                    'Employee': EmployeeFK
                }
            }
        }
    },
    Filter: {
        'Place name': tskfltr,
    },
    CardContainer: {
        'Place name': taskmd,
        'Main table': tasks
    },
    Details:{
        'Place name':taskdtls
    }
}
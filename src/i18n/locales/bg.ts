export const bg = {
    common: {
        appName: "OurVault",
        knowledgeBase: "База знания",
        loading: "Зареждане...",
        cancel: "Отказ",
        save: "Запази",
        create: "Създай",
        delete: "Изтрий",
        open: "Отвори",
        back: "Назад",
        roles: {
            owner: "Собственик",
            admin: "Администратор",
            member: "Член",
        },
    },

    navigation: {
        dashboard: "Табло",
        workspaces: "Работни пространства",
        documents: "Документи",
        chats: "Чатове",
        logout: "Изход",
        loggingOut: "Излизане...",
        search: "Търсене...",
    },

    auth: {
        welcomeBack: "ДОБРЕ ДОШЛИ",
        signInTitle: "Вход в OurVault",
        signInDescription:
            "Въведете данните си, за да продължите към вашето работно пространство.",

        email: "Имейл адрес",
        emailPlaceholder: "you@example.com",

        password: "Парола",
        passwordPlaceholder: "Въведете вашата парола",

        signIn: "Вход",
        signingIn: "Влизане...",

        newToOurVault: "Нямате акаунт в OurVault?",
        createAccount: "Създайте акаунт",

        getStarted: "ЗАПОЧНЕТЕ",
        createAccountTitle: "Създайте своя акаунт",
        createAccountDescription:
            "Създайте OurVault акаунт и започнете да изграждате своята база знания.",

        username: "Потребителско име",
        usernamePlaceholder: "Изберете потребителско име",

        createPassword: "Създайте парола",
        confirmPassword: "Потвърдете паролата",
        confirmPasswordPlaceholder: "Повторете паролата",

        creatingAccount: "Създаване на акаунт...",
        alreadyHaveAccount: "Вече имате акаунт?",

        passwordsDoNotMatch: "Паролите не съвпадат",
    },

    workspaces: {
        title: "Работни пространства",
        description:
            "Организирайте документи и работете съвместно с вашия екип.",

        newWorkspace: "Ново пространство",
        createWorkspace: "Създай пространство",

        noWorkspaces: "Все още няма работни пространства",

        noWorkspacesDescription:
            "Създайте първото си работно пространство, за да качвате документи и използвате AI чат.",

        noDescription: "Няма добавено описание.",

        access: "{{role}} достъп",

        createTitle: "Създаване на пространство",

        createDescription:
            "Създайте споделено място за документи и AI разговори.",

        name: "Име на пространството",
        namePlaceholder: "напр. Магистърска теза",

        descriptionLabel: "Описание",

        descriptionPlaceholder:
            "Какво ще съдържа това пространство?",

        creating: "Създаване...",

        loading: "Зареждане на работните пространства...",
        workspaces: {
            title: "Работни пространства",

            description:
                "Организирайте документи и работете съвместно с вашия екип.",

            newWorkspace: "Ново пространство",
            createWorkspace: "Създай пространство",

            noWorkspaces:
                "Все още няма работни пространства",

            noWorkspacesDescription:
                "Създайте първото си работно пространство, за да качвате документи и използвате AI чат.",

            noDescription: "Няма добавено описание.",

            access: "{{role}} достъп",

            createTitle:
                "Създаване на пространство",

            createDescription:
                "Създайте споделено място за документи и AI разговори.",

            name: "Име на пространството",

            namePlaceholder:
                "напр. Магистърска теза",

            descriptionLabel: "Описание",

            descriptionPlaceholder:
                "Какво ще съдържа това пространство?",

            creating: "Създаване...",
            loading:
                "Зареждане на работните пространства...",

            emptyNameError:
                "Името на работното пространство не може да бъде празно",

            open: "Отвори",
        },
    },

    workspaceDetails: {
        documents: "Документи",
        members: "Членове",
        chats: "Чатове",
        settings: "Настройки",

        backToWorkspaces:
            "Работни пространства",

        loading:
            "Зареждане на работното пространство...",

        missingId:
            "Липсва идентификатор на работното пространство",

        notFound:
            "Работното пространство не е намерено",

        uploadDocument: "Качи документ",
        newChat: "Нов чат",

        documentsDescription:
            "Документите, достъпни в това работно пространство.",

        membersDescription:
            "Управлявайте кой има достъп до това пространство.",

        chatsDescription:
            "Задавайте въпроси върху документите в това пространство.",

        settingsTitle:
            "Настройки на работното пространство",

        settingsDescription:
            "Управлявайте настройките на работното пространство.",

        documentsPlaceholder:
            "Управлението на документи ще бъде добавено тук.",

        membersPlaceholder:
            "Членовете на пространството ще бъдат показани тук.",

        chatsPlaceholder:
            "Чатовете ще бъдат показани тук.",

        settingsPlaceholder:
            "Настройките на пространството ще бъдат добавени тук.",
    },

    language: {
        english: "Английски",
        bulgarian: "Български",
    },
} as const;
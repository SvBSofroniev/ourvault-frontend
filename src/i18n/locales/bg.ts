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

        emailPlaceholder:
            "you@example.com",

        password: "Парола",

        passwordPlaceholder:
            "Въведете вашата парола",

        signIn: "Вход",

        signingIn: "Влизане...",

        newToOurVault:
            "Нямате акаунт в OurVault?",

        createAccount:
            "Създайте акаунт",

        heroEyebrow:
            "AI БАЗИРАНО УПРАВЛЕНИЕ НА ЗНАНИЯ",

        heroTitleLine1:
            "Вашите знания.",

        heroTitleLine2:
            "В едно интелигентно хранилище.",

        heroDescription:
            "Съхранявайте документи, организирайте знанията си в работни пространства и задавайте въпроси чрез AI-базирано търсене.",

        getStarted: "ЗАПОЧНЕТЕ",

        createAccountTitle:
            "Създайте своя акаунт",

        createAccountDescription:
            "Създайте OurVault акаунт и започнете да изграждате своята база знания.",

        username:
            "Потребителско име",

        usernamePlaceholder:
            "Изберете потребителско име",

        createPassword:
            "Създайте парола",

        confirmPassword:
            "Потвърдете паролата",

        confirmPasswordPlaceholder:
            "Повторете паролата",

        creatingAccount:
            "Създаване на акаунт...",

        alreadyHaveAccount:
            "Вече имате акаунт?",

        passwordsDoNotMatch:
            "Паролите не съвпадат.",

        passwordTooShort:
            "Паролата трябва да бъде поне 6 символа.",
    },

    dashboard: {
        title: "Табло",

        description:
            "Преглед на вашата база знания и последната активност.",

        viewAll: "Виж всички",

        stats: {
            workspaces: "Работни пространства",
            documents: "Документи",
            chats: "Чатове",
            aiQueries: "AI заявки",
        },

        recentWorkspaces: {
            title: "Последни работни пространства",
            documentsCount: "{{count}} документа",
        },

        recentDocuments: {
            title: "Последни документи",
        },

        documentStatus: {
            ready: "Готов",
            pending: "Изчаква",
            processing: "Обработва се",
            failed: "Неуспешен",
        },
    },
    documents: {
        loading: "Зареждане на документите...",
        uploading: "Качване...",
        deleting: "Изтриване...",
        refresh: "Обнови",

        emptyTitle: "Все още няма документи",

        emptyDescription:
            "Качете първия документ, за да започнете да изграждате базата знания на това работно пространство.",

        name: "Документ",
        status: "Статус",
        size: "Размер",
        uploadedBy: "Качен от",
        createdAt: "Качен",
        actions: "Действия",

        viewError: "Покажи грешката",
        hideError: "Скрий грешката",

        processingHint:
            "Документът се обработва в момента.",

        failedHint:
            "Обработката на документа е неуспешна.",

        noProcessingError:
            "Няма допълнителна информация за грешката.",

        statuses: {
            uploaded: "Качен",
            pending: "Изчаква",
            processing: "Обработва се",
            ready: "Готов",
            failed: "Неуспешен",
        },

        deleteTitle:
            "Изтриване на документа?",

        deleteDescription:
            'Това ще изтрие завинаги "{{filename}}" и обработените данни от документа. Действието не може да бъде отменено.',
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

    members: {
        loading:
            "Зареждане на членовете...",

        empty:
            "Няма намерени членове на работното пространство.",

        member:
            "Член",

        role:
            "Роля",

        joined:
            "Присъединен",

        actions:
            "Действия",

        addMember:
            "Добави член",

        adding:
            "Добавяне...",

        addMemberTitle:
            "Добавяне на член",

        addMemberDescription:
            "Потърсете потребител по име или имейл и го добавете към това работно пространство.",

        searchLabel:
            "Намери потребител",

        searchPlaceholder:
            "Потребителско име или имейл...",

        search:
            "Търси",

        searching:
            "Търсене...",

        searchMinimum:
            "Въведете поне 2 символа за търсене.",

        alreadyMember:
            "Вече е член",

        remove:
            "Премахни",

        removing:
            "Премахване...",

        removeTitle:
            "Премахване на член?",

        removeDescription:
            'Премахване на "{{username}}" от това работно пространство? Потребителят ще загуби достъп до документите и чатовете.',

        ownerProtected:
            "Собственик на пространството",
    },

    language: {
        english: "Английски",
        bulgarian: "Български",
    },
} as const;
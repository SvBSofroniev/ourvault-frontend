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
            "Паролата трябва да съдържа поне 8 символа.",

        firstName: "Име",
        firstNamePlaceholder: "Въведете вашето име",

        lastName: "Фамилия",
        lastNamePlaceholder: "Въведете вашата фамилия",

        dateOfBirth: "Дата на раждане",
    },

    profile: {
        eyebrow: "Акаунт",
        title: "Моят профил",
        description:
            "Управлявайте личната информация и данните на вашия акаунт.",

        personalInformation:
            "Лична информация",

        personalInformationDescription:
            "Редактирайте информацията, свързана с вашия акаунт.",

        firstName: "Име",
        lastName: "Фамилия",
        username: "Потребителско име",
        email: "Имейл адрес",
        dateOfBirth: "Дата на раждане",

        usernameHint:
            "Потребителското име засега не може да бъде променяно.",

        save: "Запази промените",
        saving: "Запазване...",

        saved:
            "Профилът е обновен успешно.",

        firstNameRequired:
            "Името е задължително.",

        lastNameRequired:
            "Фамилията е задължителна.",

        emailRequired:
            "Имейл адресът е задължителен.",
    },

    dashboard: {
        title:
            "Табло",

        description:
            "Преглед на вашата база знания в OurVault.",

        loading:
            "Зареждане на таблото...",

        loadError:
            "Таблото не може да бъде заредено.",

        refresh:
            "Обнови",

        viewAll:
            "Виж всички",

        stats: {
            workspaces:
                "Работни пространства",

            documents:
                "Документи",

            readyDocuments:
                "Готови документи",

            chats:
                "Чат сесии",
        },

        recentWorkspaces: {
            title:
                "Последни работни пространства",

            empty:
                "Все още няма работни пространства.",

            documentsCount:
                "{{count}} документа",
        },

        recentDocuments: {
            title:
                "Последни документи",

            empty:
                "Все още няма документи.",
        },

        recentChats: {
            title:
                "Последни чатове",

            empty:
                "Все още няма чат сесии.",
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

        openDocument: "Отвори документа",
    },

    documentDetails: {
        loading: "Зареждане на документа...",
        back: "Назад към работното пространство",
        information: "Информация за документа",
        fileName: "Име на файла",
        fileType: "Тип на файла",
        fileSize: "Размер",
        uploadedBy: "Качен от",
        uploadedAt: "Качен на",
        chunks: "Части",
        workspace: "Работно пространство",
        status: "Статус",

        original: "Оригинален документ",
        extractedText: "Извлечен текст",

        download: "Изтегли",
        downloading: "Изтегляне...",

        loadingContent:
            "Зареждане на извлечения текст...",

        noExtractedContent:
            "Няма наличен извлечен текст.",

        previewUnavailable:
            "Прегледът не е наличен",

        previewUnavailableDescription:
            "Този тип файл не може да бъде прегледан директно в браузъра. Можете да изтеглите оригиналния файл.",

        aiInsights: "AI анализ",

        insightsTitle: "Разберете съдържанието на документа",
        insightsDescription:
            "Генерирайте AI анализ с обобщение, ключови точки и важни факти, извлечени от документа.",

        generateInsights: "Генерирай AI анализ",
        generatingInsights: "Генериране на анализа...",
        regenerateInsights: "Генерирай отново",

        summary: "Обобщение",
        keyPoints: "Ключови точки",
        importantFacts: "Важни факти",

        noKeyPoints:
            "Не бяха открити ключови точки.",

        noImportantFacts:
            "Не бяха открити допълнителни важни факти.",

        askDocument: "Попитай за този документ",
        startingChat: "Създаване на чат...",
    },

    errors: {
        network:
            "Няма връзка със сървъра. Проверете връзката си и опитайте отново.",
        unauthorized:
            "Сесията ви е изтекла. Моля, влезте отново.",
        forbidden:
            "Нямате права за извършване на това действие.",
        notFound:
            "Заявеният ресурс не беше намерен.",
        server:
            "Възникна грешка в сървъра. Моля, опитайте отново.",
        unknown:
            "Възникна грешка. Моля, опитайте отново.",
    },

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

        noDescription:
            "Няма добавено описание.",

        access:
            "{{role}} достъп",

        createTitle:
            "Създаване на пространство",

        createDescription:
            "Създайте споделено място за документи и AI разговори.",

        name:
            "Име на пространството",

        namePlaceholder:
            "напр. Магистърска теза",

        descriptionLabel:
            "Описание",

        descriptionPlaceholder:
            "Какво ще съдържа това пространство?",

        creating:
            "Създаване...",

        loading:
            "Зареждане на работните пространства...",

        emptyNameError:
            "Името на работното пространство не може да бъде празно",

        open:
            "Отвори",
    },

    workspaceDetails: {
        documents:
            "Документи",

        members:
            "Членове",

        chats:
            "Чатове",

        settings:
            "Настройки",

        backToWorkspaces:
            "Работни пространства",

        loading:
            "Зареждане на работното пространство...",

        missingId:
            "Липсва идентификатор на работното пространство",

        notFound:
            "Работното пространство не е намерено",

        uploadDocument:
            "Качи документ",

        newChat:
            "Нов чат",

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

        search: "Търсене",
    },

    workspaceSettings: {
        title:
            "Настройки на работното пространство",

        description:
            "Управлявайте основните настройки на това работно пространство.",

        generalTitle:
            "Основни настройки",

        generalDescription:
            "Променете името и описанието на работното пространство.",

        nameLabel:
            "Име на работното пространство",

        nameHint:
            "Това име е видимо за всички членове на работното пространство.",

        descriptionLabel:
            "Описание",

        descriptionPlaceholder:
            "Опишете предназначението на това работно пространство...",

        descriptionHint:
            "Помогнете на членовете да разберат за какво се използва това пространство.",

        save:
            "Запази промените",

        saving:
            "Запазване...",

        saveSuccess:
            "Настройките на работното пространство бяха обновени успешно.",

        dangerZone:
            "Опасна зона",

        dangerDescription:
            "Действията в тази секция могат да имат необратим ефект върху работното пространство.",

        deleteWorkspace:
            "Изтрий работното пространство",

        deleteExplanation:
            "Изтрийте завинаги работното пространство и всички свързани с него данни.",

        deleteTitle:
            "Изтриване на работното пространство?",

        deleteDescription:
            'Предстои да изтриете завинаги "{{name}}".',

        deleteWarning:
            "Всички документи, обработени части, чатове, съобщения и членства в работното пространство ще бъдат изтрити завинаги. Действието не може да бъде отменено.",

        confirmDelete:
            "Изтрий работното пространство",

        deleting:
            "Изтриване...",
    },

    workspaceSearch: {
        title: "Търсене в знанията",
        description:
            "Търсете семантично в документите в това работно пространство.",
        placeholder:
            "Търсене в знанията на работното пространство...",
        search: "Търси",
        searching: "Търсене...",
        emptyTitle:
            "Търсене в знанията",
        emptyDescription:
            "Въведете фраза или въпрос, за да намерите релевантна информация в документите.",
        noResults:
            "Не бяха открити релевантни резултати.",
        results:
            "{{count}} резултата",
        chunk:
            "Част {{index}}",
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

    chats: {
        loading: "Зареждане на чатовете...",
        loadingChat: "Зареждане на разговора...",

        newChat: "Нов чат",
        create: "Създай чат",
        creating: "Създаване...",

        untitled: "Чат без заглавие",

        emptyTitle: "Все още няма разговори",

        emptyDescription:
            "Създайте разговор и задавайте въпроси върху знанията в това работно пространство.",

        createTitle: "Нов разговор",

        createDescription:
            "Създайте разговор за задаване на въпроси върху документите в работното пространство.",

        titleLabel: "Заглавие на чата",

        titlePlaceholder:
            "напр. Въпроси за магистърската теза",

        rename: "Преименувай",
        renameTitle: "Преименуване на чата",
        saving: "Запазване...",

        deleteTitle: "Изтриване на чата?",

        deleteDescription:
            'Това ще изтрие завинаги "{{title}}" и историята на разговора.',

        deleting: "Изтриване...",

        notFound: "Чатът не е намерен.",

        messagePlaceholder:
            "Задайте въпрос относно документите...",

        sendHint:
            "Enter за изпращане · Shift + Enter за нов ред",

        startConversation:
            "Попитайте OurVault",

        startConversationDescription:
            "Задайте въпрос и OurVault ще потърси подходящ контекст в прикачените документи, преди да отговори.",

        manageDocuments:
            "Управление на документи",

        manageDocumentsDescription:
            "Изберете кои готови документи да се използват като контекст за този разговор.",

        contextDocuments:
            "Контекстни документи",

        contextDescription:
            "Тези документи са достъпни за RAG търсенето в този чат.",

        noAttachedDocuments:
            "Все още няма прикачени документи.",

        attached:
            "Прикачен",

        attach:
            "Прикачи",

        attachedCount:
            "{{count}} контекстни документа",

        showSources:
            "Източници ({{count}})",

        hideSources:
            "Скрий източниците",

        chunk:
            "Част {{index}}",

        source: "Източник {{number}}",
        semanticMatch: "{{percentage}}% съвпадение",
        documentContext: "Контекст от документа",
    },
} as const;
export const en = {
    common: {
        appName: "OurVault",
        knowledgeBase: "Knowledge Base",
        loading: "Loading...",
        cancel: "Cancel",
        save: "Save",
        create: "Create",
        delete: "Delete",
        open: "Open",
        back: "Back",

        roles: {
            owner: "Owner",
            admin: "Admin",
            member: "Member",
        },
    },

    navigation: {
        dashboard: "Dashboard",
        workspaces: "Workspaces",
        documents: "Documents",
        chats: "Chats",
        logout: "Log out",
        loggingOut: "Logging out...",
        search: "Search...",
    },

    auth: {
        welcomeBack: "WELCOME BACK",
        signInTitle: "Sign in to OurVault",
        signInDescription:
            "Enter your credentials to continue to your knowledge workspace.",

        email: "Email address",
        emailPlaceholder: "you@example.com",

        password: "Password",
        passwordPlaceholder: "Enter your password",

        signIn: "Sign in",
        signingIn: "Signing in...",

        newToOurVault: "New to OurVault?",
        createAccount: "Create an account",

        getStarted: "GET STARTED",
        createAccountTitle: "Create your account",
        createAccountDescription:
            "Create an OurVault account and start building your knowledge workspace.",

        username: "Username",
        usernamePlaceholder: "Choose a username",

        createPassword: "Create a password",
        confirmPassword: "Confirm password",
        confirmPasswordPlaceholder: "Repeat your password",

        creatingAccount: "Creating account...",
        alreadyHaveAccount: "Already have an account?",

        passwordsDoNotMatch: "Passwords do not match",
    },

    workspaces: {
        title: "Workspaces",
        description:
            "Organize documents and collaborate with your team.",

        newWorkspace: "New workspace",
        createWorkspace: "Create workspace",

        noWorkspaces: "No workspaces yet",

        noWorkspacesDescription:
            "Create your first workspace to start uploading documents and using AI chat.",

        noDescription: "No description provided.",

        access: "{{role}} access",

        createTitle: "Create workspace",

        createDescription:
            "Create a shared space for documents and AI conversations.",

        name: "Workspace name",
        namePlaceholder: "e.g. Master Thesis",

        descriptionLabel: "Description",

        descriptionPlaceholder:
            "What will this workspace contain?",

        creating: "Creating...",

        loading: "Loading workspaces...",
        workspaces: {
            title: "Workspaces",
            description:
                "Organize documents and collaborate with your team.",

            newWorkspace: "New workspace",
            createWorkspace: "Create workspace",

            noWorkspaces: "No workspaces yet",

            noWorkspacesDescription:
                "Create your first workspace to start uploading documents and using AI chat.",

            noDescription: "No description provided.",

            access: "{{role}} access",

            createTitle: "Create workspace",

            createDescription:
                "Create a shared space for documents and AI conversations.",

            name: "Workspace name",
            namePlaceholder: "e.g. Master Thesis",

            descriptionLabel: "Description",

            descriptionPlaceholder:
                "What will this workspace contain?",

            creating: "Creating...",
            loading: "Loading workspaces...",

            emptyNameError:
                "Workspace name cannot be empty",

            open: "Open",
        },
    },

    workspaceDetails: {
        documents: "Documents",
        members: "Members",
        chats: "Chats",
        settings: "Settings",

        uploadDocument: "Upload document",
        newChat: "New chat",

        documentsDescription:
            "Documents available to this workspace.",

        membersDescription:
            "Manage who has access to this workspace.",

        chatsDescription:
            "Ask questions using the documents in this workspace.",

        settingsDescription:
            "Manage workspace configuration.",
        workspaceDetails: {
            documents: "Documents",
            members: "Members",
            chats: "Chats",
            settings: "Settings",

            backToWorkspaces: "Workspaces",

            loading: "Loading workspace...",
            missingId: "Workspace ID is missing",
            notFound: "Workspace not found",

            uploadDocument: "Upload document",
            newChat: "New chat",

            documentsDescription:
                "Documents available to this workspace.",

            membersDescription:
                "Manage who has access to this workspace.",

            chatsDescription:
                "Ask questions using the documents in this workspace.",

            settingsTitle: "Workspace settings",

            settingsDescription:
                "Manage workspace configuration.",

            documentsPlaceholder:
                "Document management will appear here.",

            membersPlaceholder:
                "Workspace members will appear here.",

            chatsPlaceholder:
                "Chat sessions will appear here.",

            settingsPlaceholder:
                "Workspace settings will appear here.",
        },
    },

    language: {
        english: "English",
        bulgarian: "Bulgarian",
    },
} as const;
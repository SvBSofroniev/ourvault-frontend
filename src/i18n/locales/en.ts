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

        emailPlaceholder:
            "you@example.com",

        password: "Password",

        passwordPlaceholder:
            "Enter your password",

        signIn: "Sign in",

        signingIn: "Signing in...",

        newToOurVault:
            "New to OurVault?",

        createAccount:
            "Create an account",

        heroEyebrow:
            "AI POWERED KNOWLEDGE",

        heroTitleLine1:
            "Your knowledge.",

        heroTitleLine2:
            "One intelligent vault.",

        heroDescription:
            "Store your documents, organize knowledge into workspaces and ask questions using AI-powered retrieval.",

        getStarted: "GET STARTED",

        createAccountTitle: "Create your account",

        createAccountDescription:
            "Create an OurVault account and start building your knowledge workspace.",

        username: "Username",

        usernamePlaceholder:
            "Choose a username",

        createPassword:
            "Create a password",

        confirmPassword:
            "Confirm password",

        confirmPasswordPlaceholder:
            "Repeat your password",

        creatingAccount:
            "Creating account...",

        alreadyHaveAccount:
            "Already have an account?",

        passwordsDoNotMatch:
            "Passwords do not match.",

        passwordTooShort:
            "Password must contain at least 8 characters.",

        firstName: "First name",
        firstNamePlaceholder: "Enter your first name",

        lastName: "Last name",
        lastNamePlaceholder: "Enter your last name",

        dateOfBirth: "Date of birth",

    },

    profile: {
        eyebrow: "Account",
        title: "My profile",
        description:
            "Manage your personal information and account details.",

        personalInformation:
            "Personal information",

        personalInformationDescription:
            "Update the information associated with your account.",

        firstName: "First name",
        lastName: "Last name",
        username: "Username",
        email: "Email address",
        dateOfBirth: "Date of birth",

        usernameHint:
            "Your username cannot currently be changed.",

        save: "Save changes",
        saving: "Saving changes...",

        saved:
            "Your profile has been updated successfully.",

        firstNameRequired:
            "First name is required.",

        lastNameRequired:
            "Last name is required.",

        emailRequired:
            "Email address is required.",
    },

    dashboard: {
        title: "Dashboard",

        description:
            "An overview of your OurVault knowledge base.",

        loading:
            "Loading dashboard...",

        loadError:
            "Could not load dashboard.",

        refresh:
            "Refresh",

        viewAll:
            "View all",

        stats: {
            workspaces:
                "Workspaces",

            documents:
                "Documents",

            readyDocuments:
                "Ready documents",

            chats:
                "Chat sessions",
        },

        recentWorkspaces: {
            title:
                "Recent workspaces",

            empty:
                "No workspaces yet.",

            documentsCount:
                "{{count}} documents",
        },

        recentDocuments: {
            title:
                "Recent documents",

            empty:
                "No documents yet.",
        },

        recentChats: {
            title:
                "Recent chats",

            empty:
                "No chat sessions yet.",
        },
    },

    documents: {
        loading: "Loading documents...",
        uploading: "Uploading...",
        deleting: "Deleting...",
        refresh: "Refresh",

        emptyTitle: "No documents yet",

        emptyDescription:
            "Upload your first document to start building this workspace's knowledge base.",

        name: "Document",
        status: "Status",
        size: "Size",
        uploadedBy: "Uploaded by",
        createdAt: "Uploaded",
        actions: "Actions",

        viewError: "View error",
        hideError: "Hide error",

        processingHint:
            "This document is currently being processed.",

        failedHint:
            "Document processing failed.",

        noProcessingError:
            "No additional error information is available.",

        statuses: {
            uploaded: "Uploaded",
            pending: "Pending",
            processing: "Processing",
            ready: "Ready",
            failed: "Failed",
        },

        deleteTitle: "Delete document?",

        deleteDescription:
            'This will permanently delete "{{filename}}" and its processed knowledge data. This action cannot be undone.',

        openDocument: "Open document",
    },

    documentDetails: {
        loading: "Loading document...",
        back: "Back to workspace",
        information: "Document information",
        fileName: "File name",
        fileType: "File type",
        fileSize: "File size",
        uploadedBy: "Uploaded by",
        uploadedAt: "Uploaded at",
        chunks: "Chunks",
        workspace: "Workspace",
        status: "Status",

        original: "Original document",
        extractedText: "Extracted text",

        download: "Download",
        downloading: "Downloading...",

        loadingContent:
            "Loading extracted text...",

        noExtractedContent:
            "No extracted text is available.",

        previewUnavailable:
            "Preview is not available",

        previewUnavailableDescription:
            "This file type cannot currently be previewed directly in the browser. You can download the original file instead.",

        aiInsights: "AI Insights",

        insightsTitle: "Understand this document",
        insightsDescription:
            "Generate an AI-powered overview with a summary, key points, and important facts extracted from this document.",

        generateInsights: "Generate AI Insights",
        generatingInsights: "Generating insights...",
        regenerateInsights: "Regenerate insights",

        summary: "Summary",
        keyPoints: "Key points",
        importantFacts: "Important facts",

        noKeyPoints:
            "No key points were identified.",

        noImportantFacts:
            "No additional important facts were identified.",

        askDocument: "Ask about this document",
        startingChat: "Starting chat...",
    },

    errors: {
        network:
            "Cannot connect to the server. Please check your connection and try again.",
        unauthorized:
            "Your session has expired. Please sign in again.",
        forbidden:
            "You do not have permission to perform this action.",
        notFound:
            "The requested resource was not found.",
        server:
            "Something went wrong on the server. Please try again.",
        unknown:
            "Something went wrong. Please try again.",
    },

    workspaces: {
        title:
            "Workspaces",

        description:
            "Organize documents and collaborate with your team.",

        newWorkspace:
            "New workspace",

        createWorkspace:
            "Create workspace",

        noWorkspaces:
            "No workspaces yet",

        noWorkspacesDescription:
            "Create your first workspace to start uploading documents and using AI chat.",

        noDescription:
            "No description provided.",

        access:
            "{{role}} access",

        createTitle:
            "Create workspace",

        createDescription:
            "Create a shared space for documents and AI conversations.",

        name:
            "Workspace name",

        namePlaceholder:
            "e.g. Master Thesis",

        descriptionLabel:
            "Description",

        descriptionPlaceholder:
            "What will this workspace contain?",

        creating:
            "Creating...",

        loading:
            "Loading workspaces...",

        emptyNameError:
            "Workspace name cannot be empty",

        open:
            "Open",
    },

    workspaceDetails: {
        documents:
            "Documents",

        members:
            "Members",

        chats:
            "Chats",

        settings:
            "Settings",

        backToWorkspaces:
            "Workspaces",

        loading:
            "Loading workspace...",

        missingId:
            "Workspace ID is missing",

        notFound:
            "Workspace not found",

        uploadDocument:
            "Upload document",

        newChat:
            "New chat",

        documentsDescription:
            "Documents available to this workspace.",

        membersDescription:
            "Manage who has access to this workspace.",

        chatsDescription:
            "Ask questions using the documents in this workspace.",

        settingsTitle:
            "Workspace settings",

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

        search: "Search",
    },

    workspaceSettings: {
        title: "Workspace settings",

        description:
            "Manage the general configuration of this workspace.",

        generalTitle:
            "General",

        generalDescription:
            "Update the workspace name and description.",

        nameLabel:
            "Workspace name",

        nameHint:
            "This name is visible to every member of the workspace.",

        descriptionLabel:
            "Description",

        descriptionPlaceholder:
            "Describe the purpose of this workspace...",

        descriptionHint:
            "Help members understand what this workspace is used for.",

        save:
            "Save changes",

        saving:
            "Saving...",

        saveSuccess:
            "Workspace settings updated successfully.",

        dangerZone:
            "Danger zone",

        dangerDescription:
            "Actions in this section can permanently affect the workspace.",

        deleteWorkspace:
            "Delete workspace",

        deleteExplanation:
            "Permanently delete this workspace and all of its associated knowledge data.",

        deleteTitle:
            "Delete workspace?",

        deleteDescription:
            'You are about to permanently delete "{{name}}".',

        deleteWarning:
            "All documents, processed chunks, chat sessions, messages and workspace memberships will be permanently removed. This action cannot be undone.",

        confirmDelete:
            "Delete workspace",

        deleting:
            "Deleting...",
    },

    workspaceSearch: {
        title: "Search knowledge",
        description:
            "Search across the documents in this workspace using semantic similarity.",
        placeholder:
            "Search workspace knowledge...",
        search: "Search",
        searching: "Searching...",
        emptyTitle: "Search your workspace knowledge",
        emptyDescription:
            "Enter a phrase or question to find relevant information across your documents.",
        noResults:
            "No relevant results were found.",
        results:
            "{{count}} results",
        chunk:
            "Chunk {{index}}",
    },

    members: {
        loading: "Loading members...",
        empty: "No workspace members found.",

        member: "Member",
        role: "Role",
        joined: "Joined",
        actions: "Actions",

        addMember: "Add member",
        adding: "Adding...",

        addMemberTitle: "Add workspace member",

        addMemberDescription:
            "Search for a user by username or email and add them to this workspace.",

        searchLabel: "Find user",

        searchPlaceholder:
            "Username or email...",

        search: "Search",
        searching: "Searching...",

        searchMinimum:
            "Enter at least 2 characters to search.",

        alreadyMember:
            "Already a member",

        remove: "Remove",
        removing: "Removing...",

        removeTitle:
            "Remove member?",

        removeDescription:
            'Remove "{{username}}" from this workspace? They will lose access to its documents and chats.',

        ownerProtected:
            "Workspace owner",
    },

    language: {
        english: "English",
        bulgarian: "Bulgarian",
    },

    chats: {
        loading: "Loading chats...",
        loadingChat: "Loading conversation...",

        newChat: "New chat",
        create: "Create chat",
        creating: "Creating...",

        untitled: "Untitled chat",

        emptyTitle: "No conversations yet",

        emptyDescription:
            "Create a conversation and ask questions about the knowledge stored in this workspace.",

        createTitle: "Start a new chat",

        createDescription:
            "Create a conversation for asking questions about your workspace documents.",

        titleLabel: "Chat title",

        titlePlaceholder:
            "e.g. Thesis research questions",

        rename: "Rename",
        renameTitle: "Rename chat",
        saving: "Saving...",

        deleteTitle: "Delete chat?",

        deleteDescription:
            'This will permanently delete "{{title}}" and its conversation history.',

        deleting: "Deleting...",

        notFound: "Chat session not found.",

        messagePlaceholder:
            "Ask a question about your documents...",

        sendHint:
            "Enter to send · Shift + Enter for a new line",

        startConversation:
            "Ask OurVault anything",

        startConversationDescription:
            "Ask a question and OurVault will search the attached documents for relevant context before answering.",

        manageDocuments:
            "Manage documents",

        manageDocumentsDescription:
            "Choose which READY documents should provide context for this conversation.",

        contextDocuments:
            "Context documents",

        contextDescription:
            "These documents are available to the RAG retrieval process for this chat.",

        noAttachedDocuments:
            "No documents attached yet.",

        attached:
            "Attached",

        attach:
            "Attach",

        attachedCount:
            "{{count}} context documents",

        showSources:
            "Sources ({{count}})",

        hideSources:
            "Hide sources",

        chunk:
            "Chunk {{index}}",

        source: "Source {{number}}",
        semanticMatch: "{{percentage}}% match",
        documentContext: "Document context",
    },
} as const;
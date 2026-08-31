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
        search: "Search workspaces, documents & chats...",
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

        createAccountTitle:
            "Create your account",

        createAccountDescription:
            "Create an OurVault account and start building your knowledge workspace.",

        username: "Username",

        usernamePlaceholder:
            "Choose a username",

        firstName: "First name",

        firstNamePlaceholder:
            "Enter your first name",

        lastName: "Last name",

        lastNamePlaceholder:
            "Enter your last name",

        dateOfBirth:
            "Date of birth",

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

        invalidCredentials:
            "Invalid email or password.",

        usernameRequired:
            "Username is required.",

        usernameLength:
            "Username must be between 3 and 50 characters.",

        firstNameRequired:
            "First name is required.",

        lastNameRequired:
            "Last name is required.",

        emailRequired:
            "Email address is required.",

        invalidEmail:
            "Please enter a valid email address.",

        invalidDateOfBirth:
            "Date of birth must be in the past.",

        passwordRequired:
            "Password is required.",

        passwordLength:
            "Password must be between 8 and 100 characters.",

        passwordTooShort:
            "Password must contain at least 8 characters.",

        confirmPasswordRequired:
            "Please confirm your password.",

        passwordsDoNotMatch:
            "The passwords do not match.",

        emailAlreadyExists:
            "An account with this email already exists.",

        usernameAlreadyExists:
            "This username is already taken.",

        showPassword:
            "Show password",

        hidePassword:
            "Hide password",
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

        security: "Security",
        securityDescription:
            "Update the password used to access your account.",

        currentPassword: "Current password",
        newPassword: "New password",
        confirmNewPassword:
            "Confirm new password",

        changePassword: "Change password",
        changingPassword:
            "Changing password...",

        passwordChanged:
            "Your password has been changed successfully.",

        currentPasswordRequired:
            "Current password is required.",

        newPasswordTooShort:
            "The new password must contain at least 8 characters.",

        passwordsDoNotMatch:
            "The new passwords do not match.",

        passwordMustBeDifferent:
            "The new password must be different from your current password.",

        showPassword: "Show password",
        hidePassword: "Hide password",

        newPasswordRequired:
            "New password is required.",

        confirmPasswordRequired:
            "Please confirm your new password.",

        firstNameTooLong:
            "First name cannot exceed 100 characters.",

        lastNameTooLong:
            "Last name cannot exceed 100 characters.",

        invalidEmail:
            "Please enter a valid email address.",

        invalidDateOfBirth:
            "Date of birth must be in the past.",

        newPasswordLength:
            "The new password must be between 8 and 100 characters.",
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

        deleteTitle:
            "Delete document?",

        deleteDescription:
            'This will permanently delete "{{filename}}" and its processed knowledge data. This action cannot be undone.',

        openDocument: "Open document",

        global: {
            eyebrow:
                "KNOWLEDGE LIBRARY",

            title:
                "Documents",

            description:
                "Browse documents available to you across all of your workspaces.",

            searchPlaceholder:
                "Search documents...",

            allWorkspaces:
                "All workspaces",

            allStatuses:
                "All statuses",

            emptyTitle:
                "No documents yet",

            emptyDescription:
                "Documents from your workspaces will appear here.",

            noResultsTitle:
                "No documents found",

            noResultsDescription:
                "Try changing your search or filters.",

            columns: {
                document:
                    "Document",

                workspace:
                    "Workspace",

                status:
                    "Status",

                size:
                    "Size",

                uploadedBy:
                    "Uploaded by",

                uploaded:
                    "Uploaded",
            },
        },
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
            "Unable to connect to the server. Please try again.",

        unauthorized:
            "Your session has expired. Please sign in again.",

        forbidden:
            "You do not have permission to perform this action.",

        notFound:
            "The requested resource could not be found.",

        conflict:
            "The requested operation conflicts with existing data.",

        invalidRequest:
            "The request could not be completed.",

        invalidParameter:
            "One of the supplied values is invalid.",

        malformedRequest:
            "The request is missing required information or is malformed.",

        unsupportedMediaType:
            "This content type is not supported.",

        validationFailed:
            "Some of the entered information is invalid.",

        server:
            "A server error occurred. Please try again later.",

        unknown:
            "An unexpected error occurred.",

        emailAlreadyExists:
            "An account with this email already exists.",

        usernameAlreadyExists:
            "This username is already taken.",

        invalidCredentials:
            "Invalid email or password.",

        currentPasswordIncorrect:
            "The current password is incorrect.",

        passwordsDoNotMatch:
            "The passwords do not match.",

        passwordMustBeDifferent:
            "The new password must be different from your current password.",

        accountDisabled:
            "This account is disabled.",

        accountLocked:
            "This account is locked.",

        userSearchQueryTooShort:
            "Enter at least 2 characters to search for users.",

        workspaceNotFound:
            "Workspace not found or you no longer have access to it.",

        workspaceMemberNotFound:
            "Workspace member not found.",

        workspaceMemberAlreadyExists:
            "This user is already a member of the workspace.",

        workspaceAdminRequired:
            "Only workspace administrators or the owner can perform this action.",

        workspaceOwnerRequired:
            "Only the workspace owner can perform this action.",

        workspaceOwnerRoleImmutable:
            "The workspace owner's role cannot be changed or removed.",

        workspaceOwnerAssignmentForbidden:
            "The owner role cannot be assigned through this operation.",

        workspaceRoleUnchanged:
            "This member already has the selected role.",

        adminCannotRemoveAdmin:
            "Only the workspace owner can remove an administrator.",

        workspaceNameRequired:
            "Workspace name cannot be empty.",

        documentNotFound:
            "Document not found or you no longer have access to it.",

        documentNotReady:
            "The document is not ready yet.",

        documentAlreadyProcessing:
            "The document is already being processed.",

        documentAlreadyProcessed:
            "The document has already been processed.",

        documentContentEmpty:
            "The document contains no usable processed text.",

        documentInsightsTooLarge:
            "This document is too large to generate AI insights.",

        documentFileEmpty:
            "The uploaded file cannot be empty.",

        documentFilenameMissing:
            "The uploaded file name is missing.",

        documentFilenameInvalid:
            "The uploaded file name is invalid.",

        documentExtensionRequired:
            "The document must have a supported file extension.",

        documentExtensionInvalid:
            "The document file extension is invalid.",

        unsupportedDocumentType:
            "This document type is not supported.",

        documentAlreadyAttached:
            "This document is already attached to the chat.",

        documentNotAttached:
            "This document is not attached to the chat.",

        chatSessionNotFound:
            "Chat not found or you no longer have access to it.",

        chatMessageRequired:
            "Message cannot be empty.",

        chatMessageTooLong:
            "The message is too long.",

        chatTitleRequired:
            "Chat title cannot be empty.",

        chatTitleTooLong:
            "The chat title is too long.",

        searchQueryRequired:
            "Search query cannot be empty.",

        searchQueryTooLong:
            "The search query is too long.",

        documentSelectionRequired:
            "Select at least one document.",

        questionRequired:
            "Question cannot be empty.",

        questionTooLong:
            "The question is too long.",
    },

    validation: {
        usernameRequired:
            "Username is required.",

        usernameLength:
            "Username must be between 3 and 50 characters.",

        firstNameRequired:
            "First name is required.",

        firstNameLength:
            "First name cannot exceed 100 characters.",

        lastNameRequired:
            "Last name is required.",

        lastNameLength:
            "Last name cannot exceed 100 characters.",

        emailRequired:
            "Email address is required.",

        emailInvalid:
            "Please enter a valid email address.",

        emailLength:
            "Email address is too long.",

        dateOfBirthPast:
            "Date of birth must be in the past.",

        passwordRequired:
            "Password is required.",

        passwordLength:
            "Password must be between 8 and 100 characters.",

        currentPasswordRequired:
            "Current password is required.",

        newPasswordRequired:
            "New password is required.",

        newPasswordLength:
            "New password must be between 8 and 100 characters.",

        passwordConfirmationRequired:
            "Please confirm the new password.",
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

        global: {
            eyebrow:
                "AI CONVERSATIONS",

            title:
                "Chats",

            description:
                "Browse your AI conversations across all of your workspaces.",

            searchPlaceholder:
                "Search chats...",

            allWorkspaces:
                "All workspaces",

            loading:
                "Loading chats...",

            emptyTitle:
                "No chats yet",

            emptyDescription:
                "Your AI conversations from your workspaces will appear here.",

            noResultsTitle:
                "No chats found",

            noResultsDescription:
                "Try changing your search or workspace filter.",

            openConversation:
                "Open conversation",

            columns: {
                chat:
                    "Chat",

                workspace:
                    "Workspace",

                created:
                    "Created",

                updated:
                    "Last updated",
            },
        },
    },

    globalSearch: {
        loading:
            "Searching...",

        noResults:
            "No matching workspaces, documents, or chats were found.",

        workspaces:
            "Workspaces",

        documents:
            "Documents",

        chats:
            "Chats",
    },
} as const;
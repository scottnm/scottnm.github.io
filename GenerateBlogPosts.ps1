dir $PSScriptRoot\blog_drafts\*.md |
    % { & "$PSScriptRoot\GenerateScottnmBlogPost.ps1" -MarkdownFilePath $_ -OutputHtmlFileDirectory blog_posts }

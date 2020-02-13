instructions to publish:

1. update version number in package.json
    1a. If this is not a beta version, please updated the version number appropriately.
    1b. If this is a beta release, do not touch the main version numbers (EI: "x.x.x") instead appropriately update the beta number (IE "x.x.x-beta.x")
2. npm run inline-build-templates
3. npm run ngc-build
4. npm publish 
    4a. If it asks for login or claims you are unauthorized do npm login and enter credentials
    4b. If changes are breaking or potentially harmful to current user experience, please publish under the "beta" branch.
        --npm publish --tag beta
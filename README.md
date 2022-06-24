# Appeal a planning decision prototypes

## Introduction

Users make a planning application to their local planning authority (LPA), which is usually their local council. If the LPA makes a decision that the user thinks is incorrect, legislation says they can appeal the decision. They can also appeal if the LPA takes too long to make a decision.

These prototypes cover different journeys for users of the appeal a planning decision service. This includes appellants, agents acting on behalf of appellants, LPAs, case officers, and inspectors.

## Creating a new version of an existing prototype

### New version

1. Go to `app/views/[prototype]`
2. Duplicate the latest version folder and increment the version number

### Old version

The old versioning system still works and is in use for a lot of the features, the steps for creating a new version are:

1. Go to `app/views/[prototype]`
2. Duplicate the latest version folder and increment the version number
3. Open one of the files within the folder and change the `{% extends ... %}` to the new version number
4. Do a find and replace on all files within `app/views/[prototype]/[version]` to update the `{% extends ... %}` tag to the new version
5. Go to `app/views/layouts/[prototype]`
6. Duplicate the latest version file and increment the version number
7. Open the new file and update the `{% - set version ... %}` variable to the new version number
8. Go to `app/routes/[prototype]`
9. Duplicate the latest version and increment the version number
10. Open the new file and update `var v` to the new version number
11. Open `app/routes.js` and add a line to `require` the route file you just made
12. Add a link to your new versioned prototype on the home page
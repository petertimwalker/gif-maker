I had a lot of fun working on this! Thank you for taking a look at my work and I look forward to talking about this project and Kapwing with you!

## High level
1. Upload any amount or type of files
2. See each frame 100x100 with the ability to reorder and delete frames
3. See preview with default width, height, and interval duration
4. Create GIF which will mirror preview
5. Download Final GIF

** In case of error, error message will be displayed

** Attempts to upload more photos after initial upload will reset frames
## Decisions
### Set up test harness using Jest mocks and stubs
- Could add more tests regarding drag and drop feature, preview to GIF fidelity, and interval/dimension configuration.
### Added VSCode launch config for debugging
- Useful for setting breakpoints in tests, server, and client code.
### Added Tailwind
- This isn't a substitue for the scss classes we've defined. More so just trying it out as the built in styles look nice.
### Added React Drag and Drop for ordering of frames
### Deleted local files as I go in api/gif
### Reject promises with error status code, info of where error occured, and message for transparency 

## Kapwing Interview

This repo contains the code for the Kapwing interview project, as well as samples and helper functions to make your development process more clear.

For more information and a guide on how to get set up, please refer to [this Google document](https://docs.google.com/document/d/1f7MpfMQevpiHisR4LlHJLUvprPdp4tepQbx29zW59E0/edit?usp=sharing).

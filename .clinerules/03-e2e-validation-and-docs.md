## Brief overview

- Guidelines for end-to-end validation and documentation alignment during development in this project.

## E2E validation workflow

- After every code change, rebuild the package and perform an end-to-end test using the MCP tool interface.
- Always use a real model name from the available list for tests.
- For features affecting determinism (e.g., temperature), run multiple calls to confirm expected behavior (e.g., temperature 0 yields identical outputs).

## Documentation alignment

- After any code or feature change, review and update all relevant documentation files, including README and memory-bank files.
- Ensure that new features, parameters, and behaviors are clearly described in both user-facing and internal docs.

## Commit practices

- Only commit after successful build, e2e validation, and documentation updates.
- Use Conventional Commits for all commit messages, describing both code and documentation changes when relevant.

## Communication style

- Be direct and technical in feedback and commit messages.
- Avoid unnecessary verbosity; focus on clarity and precision.

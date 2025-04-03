# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are
currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of Chi Voyage seriously. If you believe you've found a security vulnerability, please follow these steps:

1. **Do Not** disclose the vulnerability publicly until it has been addressed by our team.

2. Email your findings to [INSERT SECURITY EMAIL]. Please include:
   - A description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Any suggested fixes (if available)

3. You should receive a response within 48 hours. If you don't, please follow up via email.

4. We will keep you informed about the progress of your report and will credit you for the discovery if you wish.

## Security Measures

Our project implements the following security measures:

1. **Environment Variables**: Sensitive information is stored in environment variables and not committed to version control.

2. **API Key Management**: API keys are rotated regularly and have minimal required permissions.

3. **Input Validation**: All user input is validated and sanitized before processing.

4. **Error Handling**: Detailed error messages are not exposed to end users in production.

5. **Dependencies**: We regularly update dependencies to patch security vulnerabilities.

## Best Practices for Contributors

When contributing to this project, please follow these security best practices:

1. Never commit sensitive information (API keys, passwords, etc.)
2. Use environment variables for configuration
3. Validate and sanitize all user input
4. Follow the principle of least privilege
5. Keep dependencies up to date
6. Write secure code and follow security guidelines

## Security Updates

Security updates will be released as soon as possible after a vulnerability is discovered and fixed. We will notify users of security updates through:

1. GitHub Security Advisories
2. Release notes
3. Direct communication for critical vulnerabilities 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Status Update</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #2c3e50;
            background-color: #f8fafc;
        }

        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 32px;
            text-align: center;
        }

        .header h1 {
            margin: 0;
            color: #ffffff;
            font-size: 24px;
            font-weight: 600;
            letter-spacing: -0.5px;
        }

        .content {
            padding: 40px 32px;
        }

        .greeting {
            margin: 0 0 24px 0;
            font-size: 18px;
            color: #2c3e50;
        }

        .message {
            margin: 0 0 32px 0;
            font-size: 16px;
            color: #4a5568;
            line-height: 1.7;
        }

        .status-badge {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .status-active {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .status-inactive {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }

        .footer {
            padding: 24px 32px;
            background-color: #f8fafc;
            border-top: 1px solid #e2e8f0;
            text-align: center;
        }

        .footer p {
            margin: 0;
            font-size: 14px;
            color: #718096;
        }

        @media (max-width: 600px) {
            .email-container {
                margin: 20px;
                border-radius: 8px;
            }

            .header, .content {
                padding: 24px 20px;
            }

            .header h1 {
                font-size: 20px;
            }

            .greeting {
                font-size: 16px;
            }
        }
    </style>
</head>
<body>
<div class="email-container">
    <div class="header">
        <h1>Account Status Update</h1>
    </div>

    <div class="content">
        <p class="greeting">Hello {{ $user->name }},</p>

        <p class="message">
            Your account status has been updated to:
            <span class="status-badge {{ $user->is_active ? 'status-active' : 'status-inactive' }}">
                    {{ $user->is_active ? 'Active' : 'Inactive' }}
                </span>
        </p>
    </div>

    <div class="footer">
        <p>If you have any questions, please don't hesitate to contact our support team.</p>
    </div>
</div>
</body>
</html>

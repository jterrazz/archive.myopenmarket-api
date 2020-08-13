db.auth('admin_user', 'admin_password');

db = db.getSiblingDB('tom');

db.createUser({
    user: 'dev_user',
    pwd: 'dev_password',
    roles: [
        {
            role: 'readWrite',
            db: 'tom',
        },
    ],
});

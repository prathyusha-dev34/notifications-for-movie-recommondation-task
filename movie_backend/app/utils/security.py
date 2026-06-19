from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 🔑 Password Hash
def hash_password(password: str):
    return pwd_context.hash(password)

# 🔍 Verify Password
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)
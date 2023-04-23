---
playlistTitle: Bread and Bytes: An Introduction to Bakery-inspired Cryptography
descricaoPlaylist: "This is a 10-minute essay. There are some examples with python. I highly encourage you to do so if your objective is to get into more deep concepts in the future. For those that are not programmers, just reading the examples may be sufficient to clarify what the hell cryptography is."
---

# Bread and Bytes: An Introduction to Bakery-inspired Cryptography

## What to expect
This is a 10-minute essay. There are some examples with python. I highly encourage you to do so if your objective is to get into more deep concepts in the future. For those that are not programmers, just reading the examples may be sufficient to clarify what the hell cryptography is.

"Bread and Bytes" is a lighthearted introduction to cryptography using the analogy of a bakery. In this article, we'll explore the key concepts of hashing, keys, and signing, and show how they can be applied to bakery scenarios. With this fun and accessible approach, you'll gain a better understanding of how cryptography works and how it can be used to secure your communication and data.

## First steps!
Cryptography is the practice of securing communications from unauthorized access. In Python, there are libraries like `cryptography` and `hashlib` that can help you implement cryptographic techniques. In this response, I'll give you an overview of hashing, signing, and key concepts, and I'll show you examples using the `cryptography` library.

## Hash
Hashing is a one-way function that takes an input (or 'message') and returns a fixed-size string of bytes, typically a 'digest'. The output is unique to the input, and even a small change in the input will produce a drastically different output. Hash functions are commonly used for data integrity and password storage.

It is **deterministic**, meaning the same input will always produce the same hash.
It is **practically impossible** to regenerate the original input from the hash.
It is **sensitive to small changes** in the input, meaning even a minor modification in the input will result in a completely different hash.
It is **computationally efficient**, generating a hash quickly for any size of input data.

### Using it at the bakery
Let's imagine you own a bakery, and you want to create a password system for your employees to access the bakery's inventory system. You want to store the passwords securely, so you use hashing to store the password hashes instead of the actual passwords.

In this example, we'll compare a user-provided password (like entering a password to log in) with the hashed password stored in the system. We'll use the `hashlib` library and a "salt" to improve the security of the stored password.

In Python, you can use the `hashlib` library for hashing. Here's an example using the SHA-256 hash algorithm:

```
import hashlib

message = "Hello, world!"
message_bytes = message.encode('utf-8')

hash_object = hashlib.sha256(message_bytes)
hex_dig = hash_object.hexdigest()

print("SHA-256 hash of the message:", hex_dig)
```


### One step further
The example demonstrates a deeper aplication. How a bakery can store and verify hashed passwords for their employees to access the inventory system.

```
import hashlib
import os
import binascii
```

```
# Hash the password with a salt
def hash_password(password, salt):
    password = password.encode('utf-8')
    salt = salt.encode('utf-8')
    
    # Use the PBKDF2 (Password-Based Key Derivation Function 2) HMAC-SHA256 hashing algorithm
    # to hash the password along with the salt, iterating 100000 times.
    hashed_password = hashlib.pbkdf2_hmac('sha256', password, salt, 100000)
    
    # Convert the hashed password to a hexadecimal string and return it
    return binascii.hexlify(hashed_password).decode('utf-8')
```

```
# Generate a random salt
def generate_salt():
    # Generate a random 16-byte salt using the os.urandom() function
    return binascii.hexlify(os.urandom(16)).decode('utf-8')
```

```
# Store the hashed password (this would typically be stored in a database)
# The original password is "bakery123", but we store the hashed version for security.
salt = generate_salt()
stored_password = "bakery123"
stored_hashed_password = hash_password(stored_password, salt)

```

```
# Compare the provided password with the stored hashed password
provided_password = input("Enter your password: ")
```

```
# Hash the provided password with the same salt used for the stored password
hashed_provided_password = hash_password(provided_password, salt)
```

```
# Check if the hashed provided password matches the stored hashed password
if hashed_provided_password == stored_hashed_password:
    print("Access granted.")
else:
    print("Access denied.")
```

The original password is "bakery123", which is an employee's password to access the inventory system.

The "salt" is a random sequence of bytes that is combined with the password before hashing. It helps protect against dictionary attacks and rainbow table attacks. The salt is unique for each user and stored alongside the hashed password (usually in a database).

## Signing
Digital signatures are used to verify the authenticity and integrity of a message or data. A digital signature involves a pair of keys: a private key for signing and a public key for verification

RSA is an asymmetric key cryptographic algorithm that is widely used for encryption, digital signatures, and key exchange. It is named after its inventors, Ron Rivest, Adi Shamir, and Leonard Adleman, who first published it in 1977. 

Unlike symmetric key algorithms that use the same key for both encryption and decryption, RSA uses a pair of keys: a public key for encryption and a private key for decryption. The security of the RSA algorithm is based on the mathematical difficulty of factoring large integers into their prime factors.

In this example, we will use RSA to illustrate how can we sign a message.

```
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.backends import default_backend
``````

```
# Generate a key pair
private_key = rsa.generate_private_key(
    public_exponent=65537,
    key_size=2048,
    backend=default_backend()
)
public_key = private_key.public_key()
```

```
# Sign the message
message = b"Hello, world!"
signature = private_key.sign(
    message,
    padding.PSS(
        mgf=padding.MGF1(hashes.SHA256()),
        salt_length=padding.PSS.MAX_LENGTH
    ),
    hashes.SHA256()
)

```

```
# Verify the signature
try:
    public_key.verify(
        signature,
        message,
        padding.PSS(
            mgf=padding.MGF1(hashes.SHA256()),
            salt_length=padding.PSS.MAX_LENGTH
        ),
        hashes.SHA256()
    )
    print("Signature is valid.")
except InvalidSignature:
    print("Signature is invalid.")

```

## Wallets and Signing
A cryptocurrency wallet, like MetaMask, is like a virtual wallet where you can store, send, and receive digital assets like bread tokens. In the context of a bakery, you can think of bread tokens as a digital currency that customers can use to buy bread.

The wallet uses a pair of cryptographic keys (private and public) to sign transactions. When a customer wants to buy bread using bread tokens, they create a transaction, sign it with their wallet's private key, and broadcast the signed transaction to the network. Other nodes in the network can verify the transaction using the sender's public key. This ensures that only the person with the private key can spend the bread tokens in their wallet.

MetaMask is a popular wallet that enables users to interact with blockchain-based applications. In MetaMask, the wallet's private key is used to sign transactions, while the public key is used to derive an Ethereum address. This address serves as an identifier for the wallet and is used by others to send bread tokens to the wallet.

To sign a transaction in MetaMask, the wallet generates a digital signature using the private key and the transaction data. The signed transaction is then broadcast to the network, where it's verified by other nodes using the sender's public key. Once verified, the transaction is added to the blockchain, and the bread tokens are transferred from the sender's wallet to the recipient's wallet.

### Back to the bakery

Let's imagine a scenario where a customer, Alice, wants to buy a loaf of bread from your bakery using bread tokens. We'll use the concept of signing to ensure a secure transaction.

1. Alice initiates the transaction by specifying the amount of bread tokens she wants to send to your bakery's wallet and your wallet's public address.

2.  Alice's wallet software creates a transaction message that includes the amount of bread tokens, the bakery's wallet address, and Alice's wallet address.

3.  Alice's wallet then signs the transaction using her private key. This signature is a unique combination of the transaction message and Alice's private key, ensuring that only Alice can create this signature.

4. The signed transaction is broadcast to the network, where other nodes verify the transaction. They use Alice's public key (derived from her wallet address) to ensure the signature matches the transaction message.

5.  If the transaction is valid, the nodes add the transaction to the blockchain, and the bread tokens are transferred from Alice's wallet to the bakery's wallet.  

6. Now, the bakery can confirm the receipt of bread tokens and hand over the loaf of bread to Alice.  

In this analogy, the signing process acts as a secure method for Alice to authorize the transfer of bread tokens to the bakery. It ensures that only Alice can initiate the transaction, as only she has access to her private key. The verification process, using Alice's public key, guarantees that the transaction is genuine and has not been tampered with.

## Conclusion

Cryptography is like the bakery's secret recipe for the perfect loaf of bread. Just like how the recipe is kept under lock and key to prevent anyone from stealing it, cryptography is used to secure communication from unauthorized access.

One of the key concepts in cryptography is hashing, which is like the bakery's bread-making process. Hashing takes an input (or 'message') and returns a fixed-size string of bytes, just like how the bakery mixes ingredients in a specific way to create a perfect loaf of bread. The output is unique to the input, and even a small change in the input will produce a drastically different output, just like how a small change in the recipe can result in a completely different loaf of bread.

Keys, on the other hand, are like the bakery's secret code to access the bakery's secret recipe. In cryptography, there are two types of keys: symmetric and asymmetric. Symmetric keys are like the bakery's key to the back door - it's the same key used for both encryption and decryption. Asymmetric keys, on the other hand, are like the bakery's keypad to the safe - there are two different keys, a private key and a public key, used for encryption and decryption.

Finally, signing is like the bakery's stamp of approval on a loaf of bread. Digital signatures are used to verify the authenticity and integrity of a message or data. A digital signature involves a pair of keys: a private key for signing and a public key for verification. In the bakery scenario, this could be like the bakery owner signing off on a loaf of bread to confirm that it has been made according to the secret recipe.

So, the next time you're enjoying a delicious loaf of bread from your favorite bakery, remember that cryptography is like the secret recipe that ensures the bread is made with the right ingredients and the right process. And just like how you trust your bakery to make the perfect loaf of bread every time, you can trust cryptography to secure your communication and data.

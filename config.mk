CC = emcc
AR = emar
CFLAGS = -O2 -Wall -Wextra -pedantic -std=gnu11 -fPIC
LDFLAGS = -lmbedtls -lmbedx509 -lmbedcrypto

import * as crypto from 'crypto-js';

class Block{ // 블록 관련 객체 선언
    static index = 0; // 블록 체인의 index 번호
    private key =0;
    public hash;
    private timestamp; // 블록 만들어지는 날짜
    private data; 
    public previousHash = '';

    constructor(private message){ // 거래 목록
        Block.index += Block.index;
        this.timestamp = new Date();
        this.key=1; //남균
        this.data =  // hash = previous hash + data + date + index
            Block.index
            + this.timestamp
            + this.message
            + this.previousHash
    };

    createHash = function(){
        return crypto.HmacSHA256(this.message, this.key.toString());
    }
};

class Blockchain{ //블록 체인 구조 정의
    public chain: Array<Block> = [];
    static previousHash = ''

    addBlock(block: Block) {
        block.previousHash = Blockchain.previousHash;
        block.hash = block.createHash();
        Blockchain.previousHash = block.hash;

        this.chain.push(block);
    }
    constructor() {

    }
    isValid() {
        for(let i =1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.previousHash.toString() !== previousBlock.hash.toString()){
                return 'it is a fake coin'
            }
            return 'it is real coin'
        }
    }
};

const genesis = new Block("I am Genesis");
const tinycoin = new Blockchain();
tinycoin.addBlock(genesis);

const superman = new Block("hellow");
tinycoin.addBlock(superman);
const xman = new Block("hellow1");
tinycoin.addBlock(xman);

console.log(genesis.createHash().toString());
console.log(tinycoin.isValid());
console.log(tinycoin.chain[0].previousHash.toString());
console.log(tinycoin.chain[0].hash.toString());
console.log(tinycoin.chain[1].previousHash.toString());
console.log(tinycoin.chain[1].hash.toString());
console.log(tinycoin.chain[2].previousHash.toString());
console.log(tinycoin.chain[2].hash.toString());
// console.log(genesis.createHash().toString());
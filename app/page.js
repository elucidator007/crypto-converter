'use client'
import React, { useState } from 'react'

const Page = () => {
    const [currentWord, setCurrentWord] = useState('')
    const [allWords, setAllWords] = useState(['', '', '', '', ''])
    const [currentRow, setCurrentRow] = useState(0)
    
    const answer = 'WORLD'

    const handleInputChange = (e) => {
        const value = e.target.value.toUpperCase()
        if (value.length <= 5) {
            setCurrentWord(value)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && currentWord.length === 5) {
            setAllWords(prev => {
                const temp = [...prev]
                temp[currentRow] = currentWord
                return temp
            })
            
            setCurrentRow(prev => prev + 1)
            
            setCurrentWord('')
            
            if (currentWord === answer) {
                alert('Congratulations! You won!')
            } else if (currentRow === 4) {
                alert('Game Over! The answer was: ' + answer)
            }
        }
    }

    const getLetterStyle = (word, index) => {
        if (!word) return 'bg-gray-200'
        
        const letter = word[index]
        if (!letter) return 'bg-gray-200'
        
        if (letter === answer[index]) {
            return 'bg-green-500 text-white'
        }
        if (answer.includes(letter)) {
            return 'bg-yellow-500 text-white'
        }
        return 'bg-gray-400 text-white'
    }

    return (
        <div className="p-4 flex justify-center items-center flex-col gap-5">
            <h1 className="text-2xl font-bold mb-4">Wordle</h1>
            
            <input 
                type="text"
                value={currentWord}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="Enter word"
                maxLength={5}
                className="p-2 border rounded"
                disabled={currentRow >= 5}
            />
            
            <div className="grid gap-2">
                {allWords.map((word, rowIndex) => (
                    <div key={rowIndex} className="flex gap-2">
                        {[0, 1, 2, 3, 4].map((colIndex) => (
                            <div
                                key={colIndex}
                                className={`w-12 h-12 flex items-center justify-center font-bold rounded ${getLetterStyle(word, colIndex)}`}
                            >
                                {word[colIndex] || ''}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Page
import TextEditor from '@/components/TextEditor'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
// @ts-ignore
import { count } from '@wordpress/wordcount';

function countWords(text: string) {
  // 匹配英文单词和数字
  const englishWords = text.match(/[\w\d]+/g) || [];

  // 匹配中文字符
  const chineseCharacters = text.match(/[\u4e00-\u9fa5]/g) || [];

  // 单词总数 = 英文单词数 + 中文字符数
  const totalWords = englishWords.length + chineseCharacters.length;

  return totalWords;
}

function countParagraphs(text: string) {
  // 通过换行符分隔文本，每个新行视为一个新段落
  const paragraphs = text.trim().split(/\n/);

  // 移除仅包含空格的行
  const filteredParagraphs = paragraphs.filter(paragraph => paragraph.trim() !== '');

  return filteredParagraphs.length;
}
function countSentences(text: string) {
  // 使用正则表达式匹配句子结束符号
  const sentenceEndings = /[.!?。？！]/g;

  // 根据句子结束符分割文本
  const sentences = text.split(sentenceEndings);

  // 过滤掉空字符串
  const filteredSentences = sentences.filter(sentence => sentence.trim() !== '');

  return filteredSentences.length;
}

const calcTextInfo = (text: string) => {
  // 字符数
  const characterCount = count(text, 'characters_including_spaces')

  // 统计单词数，包括中文、英文、数字
  const wordCount = countWords(text)

  // 句子数：英文以 .!? 结尾，中文以 。！？ 结尾
  const sentenceCount = countSentences(text)

  // 段落数：两个换行符或文本结束符分隔
  const paragraphCount = countParagraphs(text)

  return {
    characters: characterCount,
    words: wordCount,
    sentences: sentenceCount,
    paragraphs: paragraphCount
  }
}

const TextCounter: FC = () => {
  const [userInput, setUserInput] = useState('')
  const [textInfo, setTextInfo] = useState({
    characters: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0
  })
  useEffect(() => {
    const textInfoValue = calcTextInfo(userInput)
    setTextInfo(textInfoValue)
  }, [userInput])
  return (
    <div className="flex w-full h-full">
      <div className="flex justify-between w-full gap-4 py-4">
        <div className='flex flex-1 h-full'>
          <TextEditor
            className="flex-1 text-white bg-black"
            value={userInput}
            onChange={(value: string) => {
              setUserInput(value)
            }}
            showSample={false}
            showCopy={false}
            placeHolder="Enter text..."
          />
        </div>
        <div className="flex flex-col flex-1 gap-4 mt-[50px]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span>Characters</span>
              <span>{textInfo.characters}</span>
            </div>
            <div className="flex flex-col">
              <span>Words</span>
              <span>{textInfo.words}</span>
            </div>
            <div className="flex flex-col">
              <span>Sentences</span>
              <span>{textInfo.sentences}</span>
            </div>
            <div className="flex flex-col">
              <span>Paragraphs</span>
              <span>{textInfo.paragraphs}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextCounter

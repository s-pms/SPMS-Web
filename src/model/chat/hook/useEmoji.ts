import { IJson } from '@/airpower/interface/IJson'

export function useEmoji() {
  const MESSAGE_EMOJI = 'emoji'
  const MESSAGE_STRING = 'str'

  function decodeEmojis(message: string): IJson[] {
    try {
      const emojiList = message.match(/\[emoji([1-9]|[1-9][0-9]|100)]/g)
      const domList = []
      if (emojiList) {
        const splitKey = 'fuc.kyo.ubb.bug'
        for (let i = 0; i < emojiList.length; i += 1) {
          message = message.replace(emojiList[i], splitKey)
        }
        const strList = message.split(splitKey)
        const maxLength = strList.length > emojiList.length
          ? strList.length
          : emojiList.length
        const isEmojiFirst = emojiList.length > 0 && message.indexOf(emojiList[0]) === 0
        for (let i = 0; i < maxLength; i += 1) {
          if (isEmojiFirst) {
            if (emojiList.length > i) {
              domList.push({
                type: MESSAGE_EMOJI,
                emoji: emojiList[i],
              })
            }
            if (strList.length > i) {
              domList.push({
                type: MESSAGE_STRING,
                str: strList[i],
              })
            }
          } else {
            if (strList.length > i) {
              domList.push({
                type: MESSAGE_STRING,
                str: strList[i],
              })
            }
            if (emojiList.length > i) {
              domList.push({
                type: MESSAGE_EMOJI,
                emoji: emojiList[i],
              })
            }
          }
        }
      } else {
        domList.push({
          type: MESSAGE_STRING,
          str: message,
        })
      }
      return domList
    } catch (e) {
      return [
        {
          type: MESSAGE_STRING,
          str: '我是呆子',
        },
      ]
    }
  }

  function getEmojiUrl(str: string) {
    str = str.replace('[emoji', '')
      .replace(']', '')
    return `/img/emoji/${str}.png`
  }

  return {
    decodeEmojis,
    getEmojiUrl,
    MESSAGE_EMOJI,
    MESSAGE_STRING,
  }
}

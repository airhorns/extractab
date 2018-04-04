module HandleMapper
  BASE_CHARS = '0SKVnQFHhGs9qo7p8cWR54duMYNXTCErx2tDmwO3kabfUB1elLvjiIgyJAZ6Pz'.split('')
  BASE = BASE_CHARS.length
  MAKE_IT_LOOK_BIG = 500000

  def self.decode(string)
    chars = string.split('')

    decoded = chars.each_with_index.inject(0) do |sum, (char, index)|
      sum + (BASE_CHARS.index(char) * BASE**index)
    end

    decoded - MAKE_IT_LOOK_BIG
  end

  def self.encode(number)
    number = number + MAKE_IT_LOOK_BIG
    digits = 1 + (Math.log(number)/Math.log(BASE)).to_i # floor'd log in the base of the string to get the length

    # loop over each digit removing the divisor at that digit position, capturing the number of times the divisor went into the number
    (0...digits).to_a.reverse!.inject([]) do |encoded, digit|
      divisor = BASE ** (digit)
      encoded << BASE_CHARS[(number / divisor).to_i]
      number = number % divisor
      encoded
    end.reverse!.join('')
  end
end

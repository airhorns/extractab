task :scratch => :environment do
  GuitarTabParser.new.parse(File.read('test/fixtures/files/tabs/all_of_me.txt'))
end

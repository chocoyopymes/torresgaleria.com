module Jekyll
  class EnvironmentVariablesGenerator < Generator
    def generate(site)
      if ENV['JEKYLL_ENV'] == 'production'
        site.config['url'] = site.config['url']
      else
        site.config['url'] = ''
      end
    end
  end
end